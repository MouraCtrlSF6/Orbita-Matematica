import { useActionState, useEffect, useRef } from 'react';
import { useSession } from '../../../app/contexts/hooks/useSession';
import { checkRoom, registerStudent, RoomError } from '../../../infrastructure/firebase/rooms';
import { createBrowserGameStorage } from '../../../infrastructure/gameStorage';
import { StudentRoom } from '../room-sync';
import { initialSave } from '../../../game/progress';

const roomIdPattern = /^[\da-f]{8}-(?:[\da-f]{4}-){3}[\da-f]{12}$/i;

async function joinStudent(roomId: string, form: FormData, signal: AbortSignal) {
  const name = readName(form);
  if (!(await checkRoom(roomId, signal))) {
    throw new RoomError('Sala não encontrada ou fechada. Confira o UID com o professor.');
  }
  signal.throwIfAborted();
  return registerRoomStudent(roomId, name, form.has('resume'), signal);
}

async function registerRoomStudent(
  roomId: string,
  name: string,
  resume: boolean,
  signal: AbortSignal,
) {
  const storage = createBrowserGameStorage(roomId);
  const save = resume ? storage.read() : initialSave();
  const student = await registerStudent(roomId, name, save, signal);
  signal.throwIfAborted();
  storage.write(save);
  return new StudentRoom(roomId, student, storage);
}

async function enterOpenRoom(
  roomId: string,
  form: FormData,
  signal: AbortSignal,
  setStudentRoom: (room: StudentRoom) => void,
) {
  return joinStudent(roomId, form, signal)
    .then((room) => {
      if (!signal.aborted) setStudentRoom(room);
      return '';
    })
    .catch(joinErrorMessage);
}

function joinErrorMessage(error: unknown) {
  return error instanceof RoomError ? error.message : 'Não foi possível entrar. Tente novamente.';
}

function readName(form: FormData) {
  const name = String(form.get('studentName') ?? '').trim();
  if (!name || name.length > 100)
    throw new RoomError('Informe seu nome completo, com até 100 caracteres.');
  return name;
}

async function joinWithRoomId(
  getSignal: () => AbortSignal,
  setStudentRoom: (room: StudentRoom) => void,
  _previous: string,
  form: FormData,
) {
  const roomId = String(form.get('roomId')).trim().toLowerCase();
  if (!roomIdPattern.test(roomId))
    return 'Informe o UID completo da sala compartilhada pelo professor.';
  return enterOpenRoom(roomId, form, getSignal(), setStudentRoom);
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
  const { setStudentRoom } = useSession();
  const getSignal = useRoomRequestSignal();
  const [error, joinRoom, joining] = useActionState(
    joinWithRoomId.bind(null, getSignal, setStudentRoom),
    '',
  );

  return { joinRoom, joining, error };
}
