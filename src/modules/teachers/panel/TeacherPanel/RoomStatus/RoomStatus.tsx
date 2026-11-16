import type { TeacherRoom } from '../../../rooms/hooks/useTeacherRoom';
import { useTeacherSession } from '../../../rooms/TeacherSession/hooks/useTeacherSession';
import { RoomResult } from './RoomResult/RoomResult';

const connectingRoom = <p role="status">Abrindo sala…</p>;

const deletedRoom = <p role="status">Sala excluída.</p>;

function isConnectingRoom(
  room: TeacherRoom | undefined,
): room is undefined | Extract<TeacherRoom, { status: 'connecting' }> {
  return !room || room.status === 'connecting';
}

export function RoomStatus() {
  const { teacherRoom } = useTeacherSession();

  if (isConnectingRoom(teacherRoom)) return connectingRoom;
  if (teacherRoom.status === 'deleted') return deletedRoom;
  return <RoomResult teacherRoom={teacherRoom} />;
}
