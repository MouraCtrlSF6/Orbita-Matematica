import { useMemo, useState } from 'react';
import { useMatch } from 'react-router';
import type { LocalSession } from '../session';
import type { StudentRoom } from '../../../pages/students/room-sync';

export function useLocalSession() {
  const [localSessionId] = useState(() => crypto.randomUUID());

  const [studentRoom, setStudentRoom] = useState<StudentRoom | null>(null);

  const [roomDeleted, setRoomDeleted] = useState(false);

  const [teacherRoomName, setTeacherRoomName] = useState<string | null>(null);

  const student = useMatch('/students');

  const teacher = useMatch('/teachers');

  const role = student ? 'student' : teacher ? 'teacher' : null;

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
