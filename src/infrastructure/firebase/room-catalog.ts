import { getRoomUser, roomRequest, RoomError } from './rooms';
import { parseRoomCatalog, storeRoomCatalog, type RoomCatalog } from '../../game/room-catalog';

export interface CatalogSnapshot {
  catalog: RoomCatalog;
  etag: string;
}

function catalogError() {
  return new RoomError('Não foi possível carregar as questões da sala. Tente novamente.');
}

export async function loadRoomCatalog(
  roomId: string,
  signal?: AbortSignal,
): Promise<CatalogSnapshot> {
  const response = await roomRequest(`/rooms/${roomId}/catalog`, await getRoomUser(), {
    headers: { 'X-Firebase-ETag': 'true' },
    signal,
  });
  try {
    return {
      catalog: parseRoomCatalog(await response.json()),
      etag: response.headers.get('etag') ?? 'null_etag',
    };
  } catch {
    throw catalogError();
  }
}

export async function saveRoomCatalog(
  roomId: string,
  snapshot: CatalogSnapshot,
  catalog: RoomCatalog,
) {
  const stored = storeRoomCatalog(catalog);

  parseRoomCatalog(stored);
  await roomRequest(`/rooms/${roomId}/catalog`, await getRoomUser(), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'If-Match': snapshot.etag },
    body: JSON.stringify(stored),
  });
  return loadRoomCatalog(roomId);
}
