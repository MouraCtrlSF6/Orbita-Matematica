import { Navigate, Outlet, useLocation, useParams } from 'react-router';
import { useSession } from '../../../../app/contexts/hooks/useSession';
import { normalizeRoomName } from '../../../../game/room-name';
import type { StudentRoom } from '../../session/room-sync';
import { MissionCatalogContext } from '../../session/contexts/mission-catalog-context';
import { StudentGameProvider } from '../../session/contexts/StudentGameProvider/StudentGameProvider';
import { studentRoomEntry, studentRoomPath } from '../../session/student-routes';
import { StudentGameLayout } from './StudentGameLayout/StudentGameLayout';

export function StudentRoomLayout() {
  const { studentRoom, studentRoomName } = useSession();
  const { roomName: rawName } = useParams();
  const { pathname } = useLocation();
  const roomName = normalizeRoomName(rawName ?? null);

  if (!roomName || !studentRoom || studentRoomName !== roomName) {
    return enterRoom(roomName, pathname);
  }
  return <StudentRoomProviders room={studentRoom} name={roomName} />;
}

function enterRoom(roomName: string | null, target: string) {
  const state = roomName ? { roomName, target } : undefined;
  return <Navigate replace to={studentRoomEntry} state={state} />;
}

function StudentRoomProviders({ room, name }: { room: StudentRoom; name: string }) {
  return (
    <MissionCatalogContext value={room.missions}>
      <StudentGameProvider key={room.roomId} room={room} roomPath={studentRoomPath(name)}>
        <StudentGameLayout>
          <Outlet />
        </StudentGameLayout>
      </StudentGameProvider>
    </MissionCatalogContext>
  );
}
