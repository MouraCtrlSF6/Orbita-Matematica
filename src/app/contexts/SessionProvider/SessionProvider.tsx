import { useLocalSession } from './hooks/useLocalSession';
import { SessionContext } from '../session';
import type { SessionProviderProps } from './contexts/session-provider-types';

export function SessionProvider({ children }: SessionProviderProps) {
  const session = useLocalSession();

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
}
