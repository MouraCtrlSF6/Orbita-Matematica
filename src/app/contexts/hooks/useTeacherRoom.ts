import { useEffect, useState } from 'react';
import { createRoom, RoomError, watchRoom } from '../../../infrastructure/firebase/rooms';

export type TeacherRoom =
  | { status: 'connecting' }
  | { status: 'ready'; studentCount: number }
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
  const update = (studentCount: number) => setRoom({ status: 'ready', studentCount });

  void createRoom(roomId, signal)
    .then(() => watchRoom(roomId, signal, update, fail))
    .catch(fail);
  return () => controller.abort();
}

export function useTeacherRoom(roomId: string) {
  const [room, setRoom] = useState<TeacherRoom>({ status: 'connecting' });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => connectRoom(roomId, setRoom), [roomId, attempt]);

  function retryRoom() {
    setRoom({ status: 'connecting' });
    setAttempt((previous) => previous + 1);
  }

  return { room, retryRoom };
}
