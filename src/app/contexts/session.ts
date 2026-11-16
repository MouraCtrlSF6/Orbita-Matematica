import { createContext } from 'react';
import type { StudentRoom } from '../../modules/students/session/room-sync';

export interface LocalSession {
  role: 'student' | 'teacher' | null;
  localSessionId: string;
  studentRoom: StudentRoom | null;
  studentRoomName: string | null;
  setStudentRoom: (room: StudentRoom, name: string) => void;
}

export const SessionContext = createContext<LocalSession | null>(null);
