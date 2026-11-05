import { SessionContext, type LocalSession } from '../../../session';
import { useTeacherRoom } from '../../../hooks/useTeacherRoom';
import { deleteRoom } from '../../../../../infrastructure/firebase/rooms';
import { type SessionProviderProps } from '../session-provider-types';

export interface TeacherSessionProps extends SessionProviderProps {
  session: LocalSession;
}

async function deleteCurrentRoom(session: LocalSession) {
  if (!session.teacherRoomName) return;
  await deleteRoom(session.localSessionId, session.teacherRoomName);
  session.markRoomDeleted();
}

export function TeacherSession({ children, session }: TeacherSessionProps) {
  const { room, retryRoom } = useTeacherRoom(
    session.localSessionId,
    Boolean(session.teacherRoomName) && !session.roomDeleted,
  );

  const value: LocalSession = {
    ...session,
    teacherRoom: session.roomDeleted ? { status: 'deleted' } : room,
    retryRoom,
    deleteRoom: deleteCurrentRoom.bind(null, session),
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
