import { useState } from 'react';
import type { LocalSession } from '../../session';
import type { StudentRoom } from '../../../../modules/students/session/room-sync';
import { useSessionRole } from './useSessionRole';

export function useLocalSession(): LocalSession {
  const [localSessionId] = useState(() => crypto.randomUUID());
  const [student, setStudent] = useState<{ room: StudentRoom; name: string } | null>(null);
  const role = useSessionRole();

  if (role !== 'student' && student) setStudent(null);

  return {
    role,
    localSessionId,
    studentRoom: student?.room ?? null,
    studentRoomName: student?.name ?? null,
    setStudentRoom: (room, name) => setStudent({ room, name }),
  };
}
