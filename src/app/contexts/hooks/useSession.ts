import { useContext } from 'react';
import { SessionContext } from '../session';

export function useSession() {
  const session = useContext(SessionContext);

  if (!session) throw new Error('useSession requires a SessionProvider.');
  return session;
}
