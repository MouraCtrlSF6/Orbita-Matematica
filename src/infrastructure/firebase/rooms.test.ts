import { defaultRoomCatalog, storeRoomCatalog } from '../../game/room-catalog';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { createRoom, findRoomByName, registerStudent, removeStudent, watchRoom } from './rooms';
import { initialSave } from '../../game/progress';
import { initialRoomStudent } from '../../game/room-progress';

const { signIn, unsubscribe, goOffline, subscribe } = vi.hoisted(() => ({
  signIn: vi.fn(),
  unsubscribe: vi.fn(),
  goOffline: vi.fn(),
  subscribe: vi.fn(),
}));

vi.mock('./firebase-app', () => ({
  initializeFirebase: () => ({ options: { databaseURL: 'https://rooms.example.test/' } }),
}));

vi.mock('firebase/auth', () => ({
  inMemoryPersistence: {},
  initializeAuth: () => ({ currentUser: null }),
  signInAnonymously: signIn,
}));

vi.mock('firebase/database', () => ({
  getDatabase: () => 'database',
  goOffline,
  goOnline: vi.fn(),
  ref: (_database: unknown, path: string) => path,
  onValue: subscribe,
}));

afterEach(() => vi.unstubAllGlobals());

beforeEach(() => {
  signIn.mockResolvedValue({ user: { uid: 'teacher-uid', getIdToken: async () => 'test-token' } });
});

it('grava os metadados da sala com o UID autenticado sem sobrescrever os alunos', async () => {
  const fetch = vi.fn().mockResolvedValue(new Response('{}'));
  vi.stubGlobal('fetch', fetch);

  await createRoom('room-id', 'turma teste');

  expect(fetch).toHaveBeenCalledWith(
    new URL('https://rooms.example.test/.json?auth=test-token'),
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
    new URL('https://rooms.example.test/roomNames/turma%20teste.json?auth=test-token'),
    expect.objectContaining({ cache: 'no-store' }),
  );
});

it('apaga o registro e bloqueia reenvios na mesma operação', async () => {
  const fetch = vi.fn().mockResolvedValue(new Response('{}'));
  vi.stubGlobal('fetch', fetch);
  await removeStudent('room-id', 'student-id');
  expect(fetch).toHaveBeenCalledWith(
    new URL('https://rooms.example.test/rooms/room-id.json?auth=test-token'),
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
    'https://rooms.example.test/rooms/room-id/students/teacher-uid.json?auth=test-token',
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
