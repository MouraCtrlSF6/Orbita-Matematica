import { useEffect, useState } from 'react';
import {
  loadRoomCatalog,
  type CatalogSnapshot,
} from '../../../../../../../../../../../infrastructure/firebase/room-catalog';

function connectCatalog(
  id: string,
  update: (snapshot: CatalogSnapshot) => void,
  fail: (message: string) => void,
) {
  const controller = new AbortController();

  void loadRoomCatalog(id, controller.signal)
    .then((snapshot) => {
      ifActive(controller.signal, update, snapshot);
    })
    .catch(() => {
      ifActive(controller.signal, fail, 'Não foi possível carregar as questões. Tente recarregar.');
    });
  return () => controller.abort();
}

export function useCatalogLoad(id: string) {
  const [snapshot, setSnapshot] = useState<CatalogSnapshot | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => connectCatalog(id, setSnapshot, setError), [id, attempt]);

  function reload() {
    setError('');
    setSnapshot(null);
    setAttempt((value) => value + 1);
  }

  return { snapshot, setSnapshot, error, reload };
}

function ifActive<T>(signal: AbortSignal, callback: (value: T) => void, value: T) {
  if (!signal.aborted) callback(value);
}
