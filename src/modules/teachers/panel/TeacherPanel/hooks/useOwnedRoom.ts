import { useEffect, useState } from 'react';
import { findOwnedRoomByName, RoomError } from '../../../../../infrastructure/firebase/rooms';

type RoomAccess =
  { status: 'loading' } | { status: 'ready'; id: string } | { status: 'error'; message: string };

async function resolveRoom(name: string, signal: AbortSignal): Promise<RoomAccess> {
  try {
    const id = await findOwnedRoomByName(name, signal);
    return { status: 'ready', id };
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof RoomError ? error.message : 'Não foi possível abrir a sala.',
    };
  }
}

export function useOwnedRoom(name: string) {
  const [access, setAccess] = useState<RoomAccess>({ status: 'loading' });

  useEffect(() => {
    const request = new AbortController();

    void resolveRoom(name, request.signal).then((result) => {
      if (!request.signal.aborted) setAccess(result);
    });
    return () => request.abort();
  }, [name]);

  return access;
}
