import { useState, type ReactNode } from 'react';
import { deleteRoom } from '../../../../infrastructure/firebase/rooms';
import { useTeacherRoom } from '../hooks/useTeacherRoom';
import { TeacherSessionContext } from './contexts/teacher-session-context';

interface TeacherSessionProps {
  id: string;
  name: string;
  children: ReactNode;
}

export function TeacherSession({ id, name, children }: TeacherSessionProps) {
  const [deleted, setDeleted] = useState(false);
  const { room, retryRoom } = useTeacherRoom(id, !deleted);

  async function deleteCurrentRoom() {
    await deleteRoom(id, name);
    setDeleted(true);
  }

  const session = {
    roomId: id,
    teacherRoomName: name,
    teacherRoom: deleted ? { status: 'deleted' as const } : room,
    retryRoom,
    deleteRoom: deleteCurrentRoom,
  };

  return (
    <TeacherSessionContext.Provider value={session}>{children}</TeacherSessionContext.Provider>
  );
}
