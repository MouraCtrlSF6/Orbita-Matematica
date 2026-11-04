import { useMemo, useState, type ReactNode } from 'react';
import { useMatch } from 'react-router';
import { SessionContext, type LocalSession } from './session';

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [localSessionId] = useState(() => crypto.randomUUID());
  const student = useMatch('/students');
  const teacher = useMatch('/teachers');
  const role = student ? 'student' : teacher ? 'teacher' : null;
  const session = useMemo<LocalSession>(() => ({ role, localSessionId }), [role, localSessionId]);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
