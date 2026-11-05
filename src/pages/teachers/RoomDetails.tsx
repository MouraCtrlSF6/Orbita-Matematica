import { useSession } from '../../app/contexts/hooks/useSession';
import type { RoomStudent } from '../../game/room-progress';
import { RoomStudents } from './RoomStudents';
import { DeleteRoomButton } from './DeleteRoomButton';
import { RoomName } from './RoomName';

export interface RoomDetailsProps {
  students: RoomStudent[];
}

export function RoomDetails({ students }: RoomDetailsProps) {
  const { deleteRoom } = useSession();

  return (
    <>
      <RoomName />
      <RoomStudents students={students} />
      {deleteRoom && <DeleteRoomButton remove={deleteRoom} />}
    </>
  );
}
