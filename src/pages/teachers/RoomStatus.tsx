import type { TeacherRoom } from '../../app/contexts/hooks/useTeacherRoom';
import { useSession } from '../../app/contexts/hooks/useSession';
import { RoomResult } from './RoomResult';

const connectingRoom = <p role="status">Abrindo sala…</p>;

const deletedRoom = <p role="status">Sala excluída.</p>;

function isConnectingRoom(
  room: TeacherRoom | undefined,
): room is undefined | Extract<TeacherRoom, { status: 'connecting' }> {
  return !room || room.status === 'connecting';
}

export function RoomStatus() {
  const { teacherRoom } = useSession();

  if (isConnectingRoom(teacherRoom)) return connectingRoom;
  if (teacherRoom.status === 'deleted') return deletedRoom;
  return <RoomResult teacherRoom={teacherRoom} />;
}
