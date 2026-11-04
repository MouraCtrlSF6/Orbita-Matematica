import { useMemo, useState, type ReactNode } from 'react';
import { useMatch } from 'react-router';
import { SessionContext, type LocalSession } from './session';
import { useTeacherRoom } from './hooks/useTeacherRoom';

interface SessionProviderProps {
  children: ReactNode;
}

interface TeacherSessionProps extends SessionProviderProps {
  session: LocalSession;
}

function TeacherSession({ children, session }: TeacherSessionProps) {
  const { room, retryRoom } = useTeacherRoom(session.localSessionId);
  const value = { ...session, teacherRoom: room, retryRoom };
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

function useLocalSession() {
  const [localSessionId] = useState(() => crypto.randomUUID());
  const [studentRoomId, setStudentRoomId] = useState<string | null>(null);
  const student = useMatch('/students');
  const teacher = useMatch('/teachers');
  const role = student ? 'student' : teacher ? 'teacher' : null;
  return useMemo<LocalSession>(
    () => ({ role, localSessionId, studentRoomId, setStudentRoomId }),
    [role, localSessionId, studentRoomId],
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
