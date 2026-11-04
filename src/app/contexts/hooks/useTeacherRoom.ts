import { useEffect, useState } from 'react';
import { createRoom, RoomError, watchRoom } from '../../../infrastructure/firebase/rooms';
import type { RoomStudent } from '../../../game/room-progress';

export type TeacherRoom =
  | { status: 'connecting' }
  | { status: 'ready'; students: RoomStudent[] }
  | { status: 'deleted' }
  | { status: 'error'; message: string };

function roomErrorMessage(error: unknown) {
  return error instanceof RoomError
    ? error.message
    : 'Não foi possível abrir a sala. Tente novamente.';
}

function failConnection(
  controller: AbortController,
  setRoom: (room: TeacherRoom) => void,
  error?: unknown,
) {
  if (controller.signal.aborted) return;
  setRoom({ status: 'error', message: roomErrorMessage(error) });
  controller.abort();
}

function connectRoom(roomId: string, setRoom: (room: TeacherRoom) => void) {
  const controller = new AbortController();
  const { signal } = controller;
  const fail = failConnection.bind(null, controller, setRoom);
  const update = (students: RoomStudent[]) => setRoom({ status: 'ready', students });

  void createRoom(roomId, signal)
    .then(() => watchRoom(roomId, signal, update, fail))
    .catch(fail);
  return () => controller.abort();
}

export function useTeacherRoom(roomId: string, deleted: boolean) {
  const [room, setRoom] = useState<TeacherRoom>({ status: 'connecting' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!deleted) return connectRoom(roomId, setRoom);
  }, [roomId, attempt, deleted]);

  function retryRoom() {
    setRoom({ status: 'connecting' });
    setAttempt((previous) => previous + 1);
  }

  return { room, retryRoom };
}
