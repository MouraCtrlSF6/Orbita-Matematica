import { inMemoryPersistence, initializeAuth, signInAnonymously, type User } from 'firebase/auth';
import { initializeFirebase } from './firebase-app';

export class RoomError extends Error {}

let pendingSignIn: Promise<User> | undefined;

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

async function roomRequest(path: string, user: User, options: RequestInit) {
  const { databaseURL } = getRoomBackend();
  const url = new URL(`${path}.json`, databaseURL);
  url.searchParams.set('auth', await user.getIdToken());
  const timeout = AbortSignal.timeout(12_000);
  const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;
  const response = await fetch(url, { ...options, signal, cache: 'no-store' });
  if (!response.ok)
    throw new RoomError(
      'O Firebase recusou a operação. Verifique a configuração da sala e tente novamente.',
    );
  return response;
}

export async function checkRoom(roomId: string, signal: AbortSignal) {
  signal.throwIfAborted();
  const user = await getRoomUser();
  const response = await roomRequest(`/rooms/${roomId}/meta/open`, user, { signal });
  return (await response.json()) === true;
}

export async function createRoom(roomId: string, signal: AbortSignal) {
  const user = await getRoomUser();
  await roomRequest(`/rooms/${roomId}/meta`, user, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ownerUid: user.uid, open: true }),
    signal,
  });
}

export async function watchRoom(
  roomId: string,
  signal: AbortSignal,
  onUpdate: (studentCount: number) => void,
  onError: () => void,
) {
  const { app, databaseURL } = getRoomBackend();
  const { getDatabase, goOffline, goOnline, onValue, ref } = await import('firebase/database');
  signal.throwIfAborted();
  const database = getDatabase(app, databaseURL);
  goOnline(database);
  const unsubscribe = onValue(
    ref(database, `rooms/${roomId}/students`),
    (snapshot) => onUpdate(snapshot.size),
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
