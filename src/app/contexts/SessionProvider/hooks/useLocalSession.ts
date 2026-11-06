import { useState } from 'react';
import type { LocalSession } from '../../session';
import type { StudentRoom } from '../../../../pages/students/room-sync';
import { useSessionRole } from './useSessionRole';
import { useTeacherRoomState } from './useTeacherRoomState';

export function useLocalSession(): LocalSession {
  const [localSessionId] = useState(() => crypto.randomUUID());
  const [studentRoom, setStudentRoom] = useState<StudentRoom | null>(null);
  const role = useSessionRole();
  const teacher = useTeacherRoomState(role === 'teacher');

  if (role !== 'student' && studentRoom) setStudentRoom(null);
  return { role, localSessionId, studentRoom, setStudentRoom, ...teacher };
}
