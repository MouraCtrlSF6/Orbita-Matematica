import { useSession } from '../../../../../../../app/contexts/hooks/useSession';
import type { RoomStudent } from '../../../../../../../game/room-progress';
import { RoomSections } from './RoomSections/RoomSections';
import { DeleteRoomDialog } from './DeleteRoomDialog/DeleteRoomDialog';
import { RoomName } from './RoomName/RoomName';

export interface RoomDetailsProps {
  students: RoomStudent[];
}

export function RoomDetails({ students }: RoomDetailsProps) {
  const { deleteRoom, localSessionId, teacherRoomName } = useSession();

  return (
    <>
      <RoomName />
      <RoomSections key={`${localSessionId}:${teacherRoomName}`} students={students} />
      {deleteRoom && <DeleteRoomDialog remove={deleteRoom} />}
    </>
  );
}
