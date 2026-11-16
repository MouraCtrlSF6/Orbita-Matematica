import { createContext } from 'react';
import type { TeacherRoom } from '../../hooks/useTeacherRoom';

interface TeacherRoomSession {
  roomId: string;
  teacherRoomName: string;
  teacherRoom: TeacherRoom;
  retryRoom: () => void;
  deleteRoom: () => Promise<void>;
}

export const TeacherSessionContext = createContext<TeacherRoomSession | null>(null);
