import { useContext } from 'react';
import { SessionContext } from '../session';

export function useSession() {
  const session = useContext(SessionContext);
  if (!session) throw new Error('useSession requer um SessionProvider.');
  return session;
}
