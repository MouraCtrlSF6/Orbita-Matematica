import { useMemo, useState } from 'react';
import type { LocalSession } from '../../session';
import type { StudentRoom } from '../../../../pages/students/room-sync';
import { useSessionRole } from './useSessionRole';

export function useLocalSession() {
  const [localSessionId] = useState(() => crypto.randomUUID());

  const [studentRoom, setStudentRoom] = useState<StudentRoom | null>(null);

  const [roomDeleted, setRoomDeleted] = useState(false);

  const [teacherRoomName, setTeacherRoomName] = useState<string | null>(null);

  const role = useSessionRole();

  if (role !== 'teacher' && roomDeleted) {
    setRoomDeleted(false);
    setTeacherRoomName(null);
  }

  return useMemo<LocalSession>(
    () => ({
      role,
      localSessionId,
      studentRoom,
      setStudentRoom,
      roomDeleted,
      markRoomDeleted: () => setRoomDeleted(true),
      teacherRoomName,
      setTeacherRoomName,
    }),
    [role, localSessionId, studentRoom, roomDeleted, teacherRoomName],
  );
}
