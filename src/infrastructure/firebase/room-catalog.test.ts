import { beforeEach, expect, it, vi } from 'vitest';
import { loadRoomCatalog, saveRoomCatalog } from './room-catalog';
import { roomRequest } from './rooms';
import { defaultRoomCatalog, storeRoomCatalog, removeRoomMission } from '../../game/room-catalog';

vi.mock('./rooms', () => ({
  getRoomUser: async () => ({ uid: 'teacher' }),
  roomRequest: vi.fn(),
  RoomError: class RoomError extends Error {},
}));

beforeEach(() => {
  vi.mocked(roomRequest).mockReset();
});

it('loads the default catalog only when the remote record is absent', async () => {
  vi.mocked(roomRequest).mockResolvedValue(
    new Response('null', { headers: { etag: 'null_etag' } }),
  );
  const snapshot = await loadRoomCatalog('legacy');

  expect(snapshot.catalog).toEqual(defaultRoomCatalog());
  expect(roomRequest).toHaveBeenCalledWith(
    '/rooms/legacy/catalog',
    { uid: 'teacher' },
    expect.objectContaining({ headers: { 'X-Firebase-ETag': 'true' } }),
  );
});

it('rejects a malformed or unreadable catalog instead of silently loading defaults', async () => {
  vi.mocked(roomRequest).mockResolvedValueOnce(new Response('{"revision":1}'));
  await expect(loadRoomCatalog('bad')).rejects.toThrow('Não foi possível carregar');
  vi.mocked(roomRequest).mockRejectedValueOnce(new Error('offline'));
  await expect(loadRoomCatalog('offline')).rejects.toThrow('offline');
});

it('uses conditional writes and reloads only after confirmation', async () => {
  const original = { catalog: defaultRoomCatalog(), etag: 'revision-zero' };
  const changed = removeRoomMission(original.catalog, original.catalog.missions[0].id);
  vi.mocked(roomRequest)
    .mockResolvedValueOnce(new Response('{}'))
    .mockResolvedValueOnce(
      new Response(JSON.stringify(storeRoomCatalog(changed)), {
        headers: { etag: 'revision-one' },
      }),
    );

  await expect(saveRoomCatalog('room', original, changed)).resolves.toEqual({
    catalog: changed,
    etag: 'revision-one',
  });
  expect(roomRequest).toHaveBeenNthCalledWith(
    1,
    '/rooms/room/catalog',
    { uid: 'teacher' },
    expect.objectContaining({
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'If-Match': 'revision-zero' },
    }),
  );
});

it('propagates a conflict without pretending that changes were saved', async () => {
  vi.mocked(roomRequest).mockRejectedValue(new Error('conflict'));
  const catalog = defaultRoomCatalog();

  await expect(
    saveRoomCatalog('room', { catalog, etag: 'old' }, { ...catalog, revision: 1 }),
  ).rejects.toThrow('conflict');
  expect(roomRequest).toHaveBeenCalledTimes(1);
});
