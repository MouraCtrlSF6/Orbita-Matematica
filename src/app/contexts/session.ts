import { createContext } from 'react';

export interface LocalSession {
  role: 'student' | 'teacher' | null;
  localSessionId: string;
}

export const SessionContext = createContext<LocalSession | null>(null);
