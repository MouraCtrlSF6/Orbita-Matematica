import { useActionState, useEffect, useRef } from 'react';
import { useSession } from '../../../app/contexts/hooks/useSession';
import { checkRoom, RoomError } from '../../../infrastructure/firebase/rooms';

const roomIdPattern = /^[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i;

function getJoinError(roomId: string, signal: AbortSignal) {
  return checkRoom(roomId, signal)
    .then((open) => (open ? '' : 'Sala não encontrada ou fechada. Confira o UID com o professor.'))
    .catch((error: unknown) =>
      error instanceof RoomError ? error.message : 'Não foi possível entrar. Tente novamente.',
    );
}

async function enterOpenRoom(
  roomId: string,
  signal: AbortSignal,
  setStudentRoomId: (roomId: string) => void,
) {
  const message = await getJoinError(roomId, signal);
  if (!message && !signal.aborted) setStudentRoomId(roomId);
  return message;
}

async function joinWithRoomId(
  getSignal: () => AbortSignal,
  setStudentRoomId: (roomId: string) => void,
  _previous: string,
  form: FormData,
) {
  const roomId = String(form.get('roomId')).trim().toLowerCase();
  if (!roomIdPattern.test(roomId))
    return 'Informe o UID completo da sala compartilhada pelo professor.';
  return enterOpenRoom(roomId, getSignal(), setStudentRoomId);
}

function useRoomRequestSignal() {
  const request = useRef<AbortController | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    request.current = controller;
    return () => controller.abort();
  }, []);
  return () => request.current?.signal ?? AbortSignal.abort();
}

export function useJoinRoom() {
  const { setStudentRoomId } = useSession();
  const getSignal = useRoomRequestSignal();
  const [error, joinRoom, joining] = useActionState(
    joinWithRoomId.bind(null, getSignal, setStudentRoomId),
    '',
  );

  return { joinRoom, joining, error };
}
