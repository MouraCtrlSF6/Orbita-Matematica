import { useLocalSession } from './hooks/useLocalSession';
import { SessionContext } from './session';
import { type SessionProviderProps } from './session-provider-types';
import { TeacherSession } from './TeacherSession';

export function SessionProvider({ children }: SessionProviderProps) {
  const session = useLocalSession();

  return session.role === 'teacher' ? (
    <TeacherSession session={session}>{children}</TeacherSession>
  ) : (
    <SessionContext.Provider value={session}>{children}</SessionContext.Provider>
  );
}
