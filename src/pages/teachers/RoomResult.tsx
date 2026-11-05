import type { TeacherRoom } from '../../app/contexts/hooks/useTeacherRoom';
import { RoomFailure } from './RoomFailure';
import { RoomDetails } from './RoomDetails';

interface RoomResultProps {
  teacherRoom: Extract<TeacherRoom, { status: 'error' | 'ready' }>;
}

export function RoomResult({ teacherRoom }: RoomResultProps) {
  if (teacherRoom.status === 'error') return <RoomFailure message={teacherRoom.message} />;

  return <RoomDetails students={teacherRoom.students} />;
}
