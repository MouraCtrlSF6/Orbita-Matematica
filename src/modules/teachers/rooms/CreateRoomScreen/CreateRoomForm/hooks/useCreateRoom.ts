import { useActionState, useState } from 'react';
import { useNavigate } from 'react-router';
import { questionListSearch, teacherPanelPath } from '../../../teacher-routes';
import { invalidRoomName, normalizeRoomName } from '../../../../../../game/room-name';
import { createRoom, RoomError } from '../../../../../../infrastructure/firebase/rooms';

async function createNamedRoom(
  roomId: string,
  setName: (name: string) => void,
  _previous: string,
  form: FormData,
) {
  const name = normalizeRoomName(form.get('roomName'));

  if (!name) return invalidRoomName;
  return createRoom(roomId, name)
    .then(() => {
      setName(name);
      return '';
    })
    .catch(createErrorMessage);
}

function createErrorMessage(error: unknown) {
  return error instanceof RoomError
    ? error.message
    : 'Não foi possível criar a sala. Tente novamente.';
}

export function useCreateRoom() {
  const navigate = useNavigate();
  const [roomId] = useState(() => crypto.randomUUID());

  function openPanel(name: string) {
    void navigate(teacherPanelPath(name) + questionListSearch, { replace: true });
  }

  const [error, action, pending] = useActionState(
    createNamedRoom.bind(null, roomId, openPanel),
    '',
  );

  return {
    error,
    action,
    pending,
  };
}
