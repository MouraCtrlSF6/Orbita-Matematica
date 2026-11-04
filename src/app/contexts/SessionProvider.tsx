import { useMemo, useState, type ReactNode } from 'react';
import { useMatch } from 'react-router';
import { SessionContext, type LocalSession } from './session';
import { useTeacherRoom } from './hooks/useTeacherRoom';
import type { StudentRoom } from '../../pages/students/room-sync';
import { deleteRoom } from '../../infrastructure/firebase/rooms';

interface SessionProviderProps {
  children: ReactNode;
}

interface TeacherSessionProps extends SessionProviderProps {
  session: LocalSession;
}

async function deleteCurrentRoom(session: LocalSession) {
  if (!session.teacherRoomName) return;
  await deleteRoom(session.localSessionId, session.teacherRoomName);
  session.markRoomDeleted();
}

function TeacherSession({ children, session }: TeacherSessionProps) {
  const { room, retryRoom } = useTeacherRoom(
    session.localSessionId,
    Boolean(session.teacherRoomName) && !session.roomDeleted,
  );
  const value: LocalSession = {
    ...session,
    teacherRoom: session.roomDeleted ? { status: 'deleted' } : room,
    retryRoom,
    deleteRoom: deleteCurrentRoom.bind(null, session),
  };
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

function useLocalSession() {
  const [localSessionId] = useState(() => crypto.randomUUID());
  const [studentRoom, setStudentRoom] = useState<StudentRoom | null>(null);
  const [roomDeleted, setRoomDeleted] = useState(false);
  const [teacherRoomName, setTeacherRoomName] = useState<string | null>(null);
  const student = useMatch('/students');
  const teacher = useMatch('/teachers');
  const role = student ? 'student' : teacher ? 'teacher' : null;
  return useMemo<LocalSession>(
    () => ({
      role,
      localSessionId,
      studentRoom,
      setStudentRoom,
      roomDeleted,
      markRoomDeleted: () => setRoomDeleted(true),
      teacherRoomName,
      setTeacherRoomName,
    }),
    [role, localSessionId, studentRoom, roomDeleted, teacherRoomName],
  );
}

export function SessionProvider({ children }: SessionProviderProps) {
  const session = useLocalSession();
  return session.role === 'teacher' ? (
    <TeacherSession session={session}>{children}</TeacherSession>
  ) : (
    <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
  );
}
