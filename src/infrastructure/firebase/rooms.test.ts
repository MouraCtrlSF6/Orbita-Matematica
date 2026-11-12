import { defaultRoomCatalog, storeRoomCatalog } from '../../game/room-catalog';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import {
  createRoom,
  deleteRoom,
  findRoomByName,
  getRoomUser,
  registerStudent,
  removeStudent,
  roomRequest,
  watchRoom,
} from './rooms';
import { browserSessionPersistence, inMemoryPersistence, initializeAuth } from 'firebase/auth';
import { getToken, initializeAppCheck } from 'firebase/app-check';
import { initialSave } from '../../game/progress';
import { initialRoomStudent } from '../../game/room-progress';
import { logFirebaseEvent } from './firebase-app';

const { signIn, unsubscribe, goOffline, subscribe, auth } = vi.hoisted(() => ({
  signIn: vi.fn(),
  unsubscribe: vi.fn(),
  goOffline: vi.fn(),
  subscribe: vi.fn(),
  auth: { currentUser: null as { uid: string } | null, authStateReady: vi.fn() },
}));

vi.mock('./firebase-app', () => ({
  initializeFirebase: () => ({ options: { databaseURL: 'https://rooms.example.test/' } }),
  logFirebaseEvent: vi.fn(),
}));

vi.mock('firebase/auth', () => ({
  inMemoryPersistence: {},
  browserSessionPersistence: {},
  initializeAuth: vi.fn(() => auth),
  signInAnonymously: signIn,
}));

vi.mock('firebase/app-check', () => ({
  initializeAppCheck: vi.fn(() => ({})),
  ReCaptchaEnterpriseProvider: class {
    constructor(readonly siteKey: string) {}
  },
  getToken: vi.fn(),
}));

vi.mock('firebase/database', () => ({
  getDatabase: () => 'database',
  goOffline,
  goOnline: vi.fn(),
  ref: (_database: unknown, path: string) => path,
  onValue: subscribe,
}));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

beforeEach(() => {
  vi.stubEnv('VITE_FIREBASE_RECAPTCHA_ENTERPRISE_SITE_KEY', 'test-site-key');
  vi.mocked(getToken).mockReset().mockResolvedValue({ token: 'test-app-check-token' });
  vi.mocked(logFirebaseEvent).mockClear();
  auth.currentUser = null;
  auth.authStateReady.mockReset().mockResolvedValue(undefined);
  signIn.mockReset();
  signIn.mockResolvedValue({ user: { uid: 'teacher-uid', getIdToken: async () => 'test-token' } });
});

it('aguarda a restauração do UID antes de autenticar e prioriza persistência na aba', async () => {
  let restore: () => void = () => {};
  auth.authStateReady.mockImplementationOnce(
    () => new Promise<void>((resolve) => (restore = resolve)),
  );
  const pending = getRoomUser();
  expect(signIn).not.toHaveBeenCalled();
  auth.currentUser = { uid: 'restored-student' };
  restore();
  await expect(pending).resolves.toBe(auth.currentUser);
  await expect(getRoomUser()).resolves.toBe(auth.currentUser);
  expect(initializeAppCheck).toHaveBeenCalledExactlyOnceWith(expect.anything(), {
    provider: expect.objectContaining({ siteKey: 'test-site-key' }),
    isTokenAutoRefreshEnabled: true,
  });
  expect(initializeAppCheck).toHaveBeenCalledBefore(vi.mocked(initializeAuth));
  expect(signIn).not.toHaveBeenCalled();
  expect(initializeAuth).toHaveBeenCalledWith(expect.anything(), {
    persistence: [browserSessionPersistence, inMemoryPersistence],
  });
});

it('requires a configured site key before initializing room authentication', async () => {
  vi.stubEnv('VITE_FIREBASE_RECAPTCHA_ENTERPRISE_SITE_KEY', ' ');
  vi.mocked(initializeAuth).mockClear();

  await expect(getRoomUser()).rejects.toThrow(
    'A verificação de segurança das salas precisa ser configurada.',
  );
  expect(initializeAuth).not.toHaveBeenCalled();
});

it('does not send a room request when App Check cannot verify it', async () => {
  const fetch = vi.fn();
  vi.stubGlobal('fetch', fetch);
  vi.mocked(getToken).mockRejectedValueOnce(new Error('reCAPTCHA unavailable'));
  const user = await getRoomUser();

  await expect(roomRequest('/roomNames/turma', user, {})).rejects.toThrow(
    'Não foi possível verificar o acesso à sala.',
  );
  expect(fetch).not.toHaveBeenCalled();
});

it('does not send a room request canceled during verification', async () => {
  const fetch = vi.fn();
  vi.stubGlobal('fetch', fetch);
  const controller = new AbortController();
  vi.mocked(getToken).mockImplementationOnce(async () => {
    controller.abort();
    return { token: 'test-app-check-token' };
  });
  const user = await getRoomUser();

  await expect(
    roomRequest('/roomNames/turma', user, { signal: controller.signal }),
  ).rejects.toThrow(expect.objectContaining({ name: 'AbortError' }));
  expect(fetch).not.toHaveBeenCalled();
});

it('compartilha uma autenticação entre chamadas simultâneas e permite repetir após falha', async () => {
  signIn.mockRejectedValueOnce(new Error('offline'));
  await expect(getRoomUser()).rejects.toThrow('offline');
  const users = await Promise.all([getRoomUser(), getRoomUser(), getRoomUser()]);
  expect(users.map((user) => user.uid)).toEqual(['teacher-uid', 'teacher-uid', 'teacher-uid']);
  expect(signIn).toHaveBeenCalledTimes(2);
});

it('grava os metadados da sala com o UID autenticado sem sobrescrever os alunos', async () => {
  const fetch = vi.fn().mockResolvedValue(new Response('{}'));
  vi.stubGlobal('fetch', fetch);

  await createRoom('room-id', 'turma teste');

  expect(logFirebaseEvent).toHaveBeenCalledExactlyOnceWith('room_created', { room_id: 'room-id' });
  expect(fetch).toHaveBeenCalledWith(
    new URL('https://rooms.example.test/.json?auth=test-token&ac=test-app-check-token'),
    expect.objectContaining({
      method: 'PATCH',
      body: JSON.stringify({
        'rooms/room-id/meta': { ownerUid: 'teacher-uid', open: true, name: 'turma teste' },
        'roomNames/turma teste': 'room-id',
        'rooms/room-id/catalog': storeRoomCatalog(defaultRoomCatalog()),
      }),
    }),
  );
});

it.each([
  {
    operation: createRoom,
    event: 'room_created',
    confirmed: '11111111-1111-4111-8111-111111111111',
    rejected: null,
  },
  { operation: deleteRoom, event: 'room_deleted', confirmed: null, rejected: true },
])(
  'logs $event only after the room operation is confirmed',
  async ({ operation, event, confirmed, rejected }) => {
    const roomId = '11111111-1111-4111-8111-111111111111';
    const fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error('PATCH failed'))
      .mockResolvedValueOnce(new Response(JSON.stringify(rejected)))
      .mockRejectedValueOnce(new Error('Response lost'))
      .mockResolvedValueOnce(new Response(JSON.stringify(confirmed)));
    vi.stubGlobal('fetch', fetch);

    await expect(operation(roomId, 'turma teste')).rejects.toThrow('PATCH failed');
    expect(logFirebaseEvent).not.toHaveBeenCalled();

    await operation(roomId, 'turma teste');
    expect(logFirebaseEvent).toHaveBeenCalledExactlyOnceWith(event, { room_id: roomId });
  },
);

it('busca por nome no índice sem ler a coleção de salas', async () => {
  const roomId = '11111111-1111-4111-8111-111111111111';
  const fetch = vi
    .fn()
    .mockResolvedValueOnce(new Response(JSON.stringify(roomId)))
    .mockResolvedValueOnce(new Response('null'));
  vi.stubGlobal('fetch', fetch);
  const { signal } = new AbortController();

  await expect(findRoomByName('turma teste', signal)).resolves.toBe(roomId);
  await expect(findRoomByName('missing', signal)).resolves.toBe(null);
  expect(fetch).toHaveBeenCalledWith(
    new URL(
      'https://rooms.example.test/roomNames/turma%20teste.json?auth=test-token&ac=test-app-check-token',
    ),
    expect.objectContaining({ cache: 'no-store' }),
  );
});

it('apaga o registro e bloqueia reenvios na mesma operação', async () => {
  const fetch = vi.fn().mockResolvedValue(new Response('{}'));
  vi.stubGlobal('fetch', fetch);
  await removeStudent('room-id', 'student-id');
  expect(fetch).toHaveBeenCalledWith(
    new URL(
      'https://rooms.example.test/rooms/room-id.json?auth=test-token&ac=test-app-check-token',
    ),
    expect.objectContaining({
      method: 'PATCH',
      body: JSON.stringify({ 'removedStudents/student-id': true, 'students/student-id': null }),
    }),
  );
});

it('confirma o registro existente após reenvio do PUT condicional', async () => {
  const save = initialSave();
  const previous = initialRoomStudent('teacher-uid', 'Nome já registrado', save);
  const fetch = vi
    .fn()
    .mockResolvedValueOnce(new Response('{}', { status: 412 }))
    .mockResolvedValueOnce(new Response(JSON.stringify(previous)));
  vi.stubGlobal('fetch', fetch);

  const student = await registerStudent(
    'room-id',
    'Outro nome',
    save,
    new AbortController().signal,
  );

  expect(student).toEqual(previous);
  const path = new URL(
    'https://rooms.example.test/rooms/room-id/students/teacher-uid.json?auth=test-token&ac=test-app-check-token',
  );
  expect(fetch).toHaveBeenNthCalledWith(
    1,
    path,
    expect.objectContaining({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'If-Match': 'null_etag' },
    }),
  );
  expect(fetch).toHaveBeenNthCalledWith(2, path, expect.not.objectContaining({ method: 'PUT' }));
});

it('acompanha os alunos da sala e encerra a conexão ao cancelar', async () => {
  subscribe.mockImplementation((_path, update) => {
    update({ val: () => null });
    return unsubscribe;
  });
  const controller = new AbortController();
  const onUpdate = vi.fn();

  await watchRoom('room-id', controller.signal, onUpdate, vi.fn());
  expect(subscribe).toHaveBeenCalledWith(
    'rooms/room-id/students',
    expect.any(Function),
    expect.any(Function),
  );
  expect(onUpdate).toHaveBeenCalledWith([]);
  controller.abort();
  expect(unsubscribe).toHaveBeenCalledOnce();
  expect(goOffline).toHaveBeenCalledWith('database');
});
