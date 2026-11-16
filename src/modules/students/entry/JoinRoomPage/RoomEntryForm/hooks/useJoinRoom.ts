import { useActionState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { studentSectorsPath } from '../../../../session/student-routes';
import { useSession } from '../../../../../../app/contexts/hooks/useSession';
import { initialSave } from '../../../../../../game/progress';
import { invalidRoomName, normalizeRoomName } from '../../../../../../game/room-name';
import { logFirebaseEvent } from '../../../../../../infrastructure/firebase/firebase-app';
import { loadRoomCatalog } from '../../../../../../infrastructure/firebase/room-catalog';
import {
  findRoomByName,
  registerStudent,
  RoomError,
} from '../../../../../../infrastructure/firebase/rooms';
import { createBrowserGameStorage } from '../../../../../../infrastructure/gameStorage';
import { StudentRoom } from '../../../../session/room-sync';

async function joinStudent(roomName: string, form: FormData, signal: AbortSignal) {
  const name = readName(form);

  const roomId = await findRoomByName(roomName, signal);

  if (!roomId) {
    throw new RoomError('Sala não encontrada ou fechada. Confira o nome com o professor.');
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
  const { catalog } = await loadRoomCatalog(roomId, signal);

  const storage = createBrowserGameStorage(roomId, catalog.missions);

  const save = resume ? storage.read() : initialSave();

  const student = await registerStudent(roomId, name, save, signal, catalog.missions);

  signal.throwIfAborted();
  storage.write(save);
  return new StudentRoom(roomId, student, storage, catalog.missions);
}

async function enterOpenRoom(
  roomName: string,
  form: FormData,
  signal: AbortSignal,
  onJoined: (room: StudentRoom, name: string) => void,
) {
  return joinStudent(roomName, form, signal)
    .then((room) => {
      if (!signal.aborted) {
        onJoined(room, roomName);

        void logFirebaseEvent('student_room_entrance', {
          room_id: room.roomId,
        });
      }
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

async function joinWithRoomName(
  getSignal: () => AbortSignal,
  onJoined: (room: StudentRoom, name: string) => void,
  _previous: string,
  form: FormData,
) {
  const roomName = normalizeRoomName(form.get('roomName'));

  if (!roomName) return invalidRoomName;
  return enterOpenRoom(roomName, form, getSignal(), onJoined);
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
  const navigate = useNavigate();
  const { state } = useLocation();
  const roomName = typeof state?.roomName === 'string' ? state.roomName : '';

  function onJoined(room: StudentRoom, name: string) {
    setStudentRoom(room, name);
    const sectors = studentSectorsPath(name);
    const target: unknown = state?.target;
    const matchesRoom = typeof target === 'string' && roomName === name;

    void navigate(matchesRoom ? target : sectors, { replace: true });
  }

  const [error, joinRoom, joining] = useActionState(
    joinWithRoomName.bind(null, getSignal, onJoined),
    '',
  );

  return {
    roomName,
    joinRoom,
    joining,
    error,
  };
}
