import { useState, useRef, type RefObject } from 'react';
import {
  saveRoomCatalog,
  type CatalogSnapshot,
} from '../../../../../../../../../../../infrastructure/firebase/room-catalog';
import { RoomError } from '../../../../../../../../../../../infrastructure/firebase/rooms';
import type { RoomCatalog } from '../../../../../../../../../../../game/room-catalog';

function errorMessage(error: unknown) {
  if (error instanceof RoomError && error.status === 412)
    return 'As questões mudaram em outra aba. Recarregue a lista antes de tentar novamente.';
  return error instanceof Error ? error.message : 'Não foi possível salvar. Tente novamente.';
}

interface WriteRequest {
  error: string;
  message: string;
  pending: boolean;
}
interface Writer {
  id: string;
  snapshot: CatalogSnapshot;
  catalog: RoomCatalog;
  update: (snapshot: CatalogSnapshot) => void;
}

async function writeCatalog(
  writer: Writer,
  success: string,
  setState: (value: WriteRequest) => void,
) {
  try {
    writer.update(await saveRoomCatalog(writer.id, writer.snapshot, writer.catalog));
    setState({ pending: false, error: '', message: success });
    return true;
  } catch (reason) {
    setState({ pending: false, message: '', error: errorMessage(reason) });
    return false;
  }
}

export function useCatalogWrite(
  id: string,
  snapshot: CatalogSnapshot | null,
  update: (snapshot: CatalogSnapshot) => void,
) {
  const [state, setState] = useState<WriteRequest>({ error: '', message: '', pending: false });
  const busy = useRef(false);

  const save = (catalog: RoomCatalog, success: string) =>
    saveCatalog({ id, snapshot, update, busy, setState }, catalog, success);

  return { ...state, save, clear: () => setState({ pending: false, error: '', message: '' }) };
}

interface CatalogWriteOptions {
  id: string;
  snapshot: CatalogSnapshot | null;
  update: (snapshot: CatalogSnapshot) => void;
  busy: RefObject<boolean>;
  setState: (value: WriteRequest) => void;
}

async function saveCatalog(options: CatalogWriteOptions, catalog: RoomCatalog, success: string) {
  if (!options.snapshot || options.busy.current) return false;
  options.busy.current = true;
  options.setState({ pending: true, error: '', message: '' });
  const writer = { id: options.id, snapshot: options.snapshot, catalog, update: options.update };
  const result = await writeCatalog(writer, success, options.setState);

  options.busy.current = false;
  return result;
}
