import { missions } from '../../content/missions';
import { defaultRoomCatalog, storeRoomCatalog } from '../../game/room-catalog';
import { mergeStudentMissions } from '../../game/merge-student-missions';
import {
  browserSessionPersistence,
  inMemoryPersistence,
  initializeAuth,
  signInAnonymously,
  type User,
} from 'firebase/auth';
import { initializeFirebase, logFirebaseEvent } from './firebase-app';
import { initialRoomStudent, type RoomStudent } from '../../game/room-progress';
import type { Mission, SavedGame } from '../../game/types';
import { readRoomStudent, readRoomStudents } from './room-records';

export class RoomError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

let pendingSignIn: Promise<User> | undefined;

function getRoomBackend() {
  const app = initializeFirebase();
  if (!app?.options.databaseURL)
    throw new RoomError('O banco de dados das salas precisa ser configurado.');
  return { app, databaseURL: app.options.databaseURL };
}

export async function getRoomUser() {
  const { app } = getRoomBackend();
  const auth = initializeAuth(app, {
    persistence: [browserSessionPersistence, inMemoryPersistence],
  });
  await auth.authStateReady();
  if (auth.currentUser) return auth.currentUser;

  pendingSignIn ??= signInAnonymously(auth)
    .then(({ user }) => user)
    .finally(() => {
      pendingSignIn = undefined;
    });
  return pendingSignIn;
}

export async function roomRequest(
  path: string,
  user: User,
  options: RequestInit,
  acceptedStatus = 0,
) {
  const { databaseURL } = getRoomBackend();
  const url = new URL(`${path}.json`, databaseURL);
  url.searchParams.set('auth', await user.getIdToken());
  const timeout = AbortSignal.timeout(12_000);
  const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
  const response = await fetch(url, { ...options, signal, cache: 'no-store' });
  if (!response.ok && response.status !== acceptedStatus)
    throw new RoomError(
      'O Firebase recusou a operação. Verifique a configuração da sala e tente novamente.',
      response.status,
    );
  return response;
}

export type StudentPatch = Record<string, unknown>;

function studentPath(roomId: string, uid: string) {
  return `/rooms/${roomId}/students/${uid}`;
}

export async function registerStudent(
  roomId: string,
  name: string,
  save: SavedGame,
  signal: AbortSignal,
  catalog: Mission[] = missions,
) {
  const user = await getRoomUser();
  const student = initialRoomStudent(user.uid, name, save, catalog);
  const path = studentPath(roomId, user.uid);
  const response = await roomRequest(
    path,
    user,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'If-Match': 'null_etag' },
      body: JSON.stringify(student),
      signal,
    },
    412,
  );
  if (response.status !== 412) return student;
  const existing = await readOwnStudent(path, user, signal);
  const { merged, patch } = mergeStudentMissions(existing, student);

  if (Object.keys(patch).length) await roomRequest(path, user, roomPatch(patch, signal));
  return merged;
}

async function readOwnStudent(path: string, user: User, signal: AbortSignal) {
  const response = await roomRequest(path, user, { signal });
  const student = readRoomStudent(await response.json());
  if (student?.studentId === user.uid) return student;
  throw new RoomError('Não foi possível confirmar seu registro na sala.');
}

export async function updateStudent(roomId: string, uid: string, patch: StudentPatch) {
  const user = await getRoomUser();
  if (user.uid !== uid) throw new RoomError('A identidade da sala mudou.', 403);
  await roomRequest(studentPath(roomId, uid), user, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
}

function roomPatch(body: StudentPatch, signal?: AbortSignal): RequestInit {
  return {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  };
}

export async function removeStudent(roomId: string, uid: string) {
  const user = await getRoomUser();
  await roomRequest(
    `/rooms/${roomId}`,
    user,
    roomPatch({
      [`removedStudents/${uid}`]: true,
      [`students/${uid}`]: null,
    }),
  );
}

export async function deleteRoom(roomId: string, name: string) {
  const user = await getRoomUser();
  try {
    await roomRequest(
      '',
      user,
      roomPatch({ [`rooms/${roomId}`]: null, [`roomNames/${name}`]: null }),
    );
  } catch (error) {
    const response = await roomRequest(`/rooms/${roomId}/meta/open`, user, {});
    if ((await response.json()) !== null) throw error;
  }
  void logFirebaseEvent('room_deleted', { room_id: roomId });
}

async function readRoomId(name: string, user: User, signal?: AbortSignal) {
  const response = await roomRequest(`/roomNames/${encodeURIComponent(name)}`, user, { signal });
  const id: unknown = await response.json();
  return typeof id === 'string' && /^[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/.test(id)
    ? id
    : null;
}

export async function findRoomByName(name: string, signal: AbortSignal) {
  signal.throwIfAborted();
  return readRoomId(name, await getRoomUser(), signal);
}

async function confirmCreation(name: string, roomId: string, user: User, error: unknown) {
  const existing = await readRoomId(name, user);
  if (existing === roomId) return;
  if (existing) throw new RoomError('Já existe uma sala com esse nome. Escolha outro.', 409);
  throw error;
}

export async function createRoom(roomId: string, name: string) {
  const user = await getRoomUser();
  const patch = roomPatch({
    [`rooms/${roomId}/meta`]: { ownerUid: user.uid, open: true, name },
    [`roomNames/${name}`]: roomId,
    [`rooms/${roomId}/catalog`]: storeRoomCatalog(defaultRoomCatalog()),
  });
  await roomRequest('', user, patch).catch((error: unknown) =>
    confirmCreation(name, roomId, user, error),
  );
  void logFirebaseEvent('room_created', { room_id: roomId });
}

export async function watchRoom(
  roomId: string,
  signal: AbortSignal,
  onUpdate: (students: RoomStudent[]) => void,
  onError: () => void,
) {
  const { app, databaseURL } = getRoomBackend();
  const { getDatabase, goOffline, goOnline, onValue, ref } = await import('firebase/database');
  signal.throwIfAborted();
  const database = getDatabase(app, databaseURL);
  goOnline(database);
  const unsubscribe = onValue(
    ref(database, `rooms/${roomId}/students`),
    (snapshot) => onUpdate(readRoomStudents(snapshot.val())),
    onError,
  );
  signal.addEventListener(
    'abort',
    () => {
      unsubscribe();
      goOffline(database);
    },
    { once: true },
  );
}
