import { useSession } from '../../../../../../../app/contexts/hooks/useSession';
import type { RoomStudent } from '../../../../../../../game/room-progress';
import { RoomSections } from './RoomSections/RoomSections';
import { DeleteRoomButton } from './DeleteRoomButton/DeleteRoomButton';
import { RoomName } from './RoomName/RoomName';

export interface RoomDetailsProps {
  students: RoomStudent[];
}

export function RoomDetails({ students }: RoomDetailsProps) {
  const { deleteRoom } = useSession();

  return (
    <>
      <RoomName />
      <RoomSections students={students} />
      {deleteRoom && <DeleteRoomButton remove={deleteRoom} />}
    </>
  );
}
