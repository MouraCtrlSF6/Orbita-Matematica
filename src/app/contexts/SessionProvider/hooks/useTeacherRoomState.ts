import { useState } from 'react';

export function useTeacherRoomState(active: boolean) {
  const [roomDeleted, setRoomDeleted] = useState(false);
  const [teacherRoomName, setTeacherRoomName] = useState<string | null>(null);

  if (!active && roomDeleted) {
    setRoomDeleted(false);
    setTeacherRoomName(null);
  }
  return {
    roomDeleted,
    markRoomDeleted: () => setRoomDeleted(true),
    teacherRoomName,
    setTeacherRoomName,
  };
}
