import { createContext } from 'react';
import type { TeacherRoom } from './hooks/useTeacherRoom';
import type { StudentRoom } from '../../pages/students/room-sync';

export interface LocalSession {
  role: 'student' | 'teacher' | null;
  localSessionId: string;
  studentRoom: StudentRoom | null;
  setStudentRoom: (room: StudentRoom) => void;
  teacherRoom?: TeacherRoom;
  retryRoom?: () => void;
  deleteRoom?: () => Promise<void>;
  roomDeleted: boolean;
  markRoomDeleted: () => void;
}

export const SessionContext = createContext<LocalSession | null>(null);
