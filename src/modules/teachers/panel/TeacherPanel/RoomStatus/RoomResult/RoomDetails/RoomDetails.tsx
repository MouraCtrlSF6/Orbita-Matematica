import { useTeacherSession } from '../../../../../rooms/TeacherSession/hooks/useTeacherSession';
import type { RoomStudent } from '../../../../../../../game/room-progress';
import { RoomSections } from './RoomSections/RoomSections';
import { DeleteRoomDialog } from './DeleteRoomDialog/DeleteRoomDialog';
import { RoomName } from './RoomName/RoomName';

export interface RoomDetailsProps {
  students: RoomStudent[];
}

export function RoomDetails({ students }: RoomDetailsProps) {
  const { deleteRoom, roomId, teacherRoomName } = useTeacherSession();

  return (
    <>
      <RoomName />
      <RoomSections key={`${roomId}:${teacherRoomName}`} students={students} />
      {deleteRoom && <DeleteRoomDialog remove={deleteRoom} />}
    </>
  );
}
