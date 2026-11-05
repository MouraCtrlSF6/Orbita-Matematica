import { useActionState } from 'react';
import { useSession } from '../../../app/contexts/hooks/useSession';
import { invalidRoomName, normalizeRoomName } from '../../../game/room-name';
import { createRoom, RoomError } from '../../../infrastructure/firebase/rooms';

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
  const { localSessionId, setTeacherRoomName } = useSession();

  const [error, action, pending] = useActionState(
    createNamedRoom.bind(null, localSessionId, setTeacherRoomName),
    '',
  );

  return {
    error,
    action,
    pending,
  };
}
