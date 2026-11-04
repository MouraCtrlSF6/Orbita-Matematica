import { createContext } from 'react';
import type { TeacherRoom } from './hooks/useTeacherRoom';

export interface LocalSession {
  role: 'student' | 'teacher' | null;
  localSessionId: string;
  studentRoomId: string | null;
  setStudentRoomId: (roomId: string) => void;
  teacherRoom?: TeacherRoom;
  retryRoom?: () => void;
}

export const SessionContext = createContext<LocalSession | null>(null);
