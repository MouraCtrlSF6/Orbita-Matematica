import { inMemoryPersistence, initializeAuth, signInAnonymously, type User } from 'firebase/auth';
import { initializeFirebase } from './firebase-app';
import { initialRoomStudent, type RoomStudent } from '../../game/room-progress';
import type { SavedGame } from '../../game/types';
import { isRoomStudent, readRoomStudents } from './room-records';

export class RoomError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
  }
}

let pendingSignIn: Promise<User> | undefined;
const createdRooms = new Set<string>();

function getRoomBackend() {
  const app = initializeFirebase();
  if (!app?.options.databaseURL)
    throw new RoomError('O banco de dados das salas precisa ser configurado.');
  return { app, databaseURL: app.options.databaseURL };
}

async function getRoomUser() {
  const { app } = getRoomBackend();
  const auth = initializeAuth(app, { persistence: inMemoryPersistence });
  if (auth.currentUser) return auth.currentUser;

  pendingSignIn ??= signInAnonymously(auth)
    .then(({ user }) => user)
    .finally(() => {
      pendingSignIn = undefined;
    });
  return pendingSignIn;
}

async function roomRequest(path: string, user: User, options: RequestInit, acceptedStatus = 0) {
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
) {
  const user = await getRoomUser();
  const student = initialRoomStudent(user.uid, name, save);
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
  return response.status === 412 ? readOwnStudent(path, user, signal) : student;
}

async function readOwnStudent(path: string, user: User, signal: AbortSignal) {
  const response = await roomRequest(path, user, { signal });
  const student: unknown = await response.json();
  if (isRoomStudent(student) && student.studentId === user.uid) return student;
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

export async function deleteRoom(roomId: string) {
  const user = await getRoomUser();
  try {
    await roomRequest(`/rooms/${roomId}`, user, { method: 'DELETE' });
  } catch (error) {
    const response = await roomRequest(`/rooms/${roomId}/meta/open`, user, {});
    if ((await response.json()) !== null) throw error;
  }
}

export async function checkRoom(roomId: string, signal: AbortSignal) {
  signal.throwIfAborted();
  const user = await getRoomUser();
  const response = await roomRequest(`/rooms/${roomId}/meta/open`, user, { signal });
  return (await response.json()) === true;
}

export async function createRoom(roomId: string, signal: AbortSignal) {
  if (createdRooms.has(roomId)) return;
  const user = await getRoomUser();
  await roomRequest(`/rooms/${roomId}/meta`, user, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ownerUid: user.uid, open: true }),
    signal,
  });
  createdRooms.add(roomId);
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
