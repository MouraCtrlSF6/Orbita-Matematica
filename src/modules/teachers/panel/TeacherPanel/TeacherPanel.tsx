import { Navigate, useParams, useSearchParams } from 'react-router';
import { normalizeRoomName } from '../../../../game/room-name';
import { TeacherSession } from '../../rooms/TeacherSession/TeacherSession';
import { teacherRoomCreation } from '../../rooms/teacher-routes';
import { ProfileFallbackNavigation } from './ProfileFallbackNavigation/ProfileFallbackNavigation';
import { RoomStatus } from './RoomStatus/RoomStatus';
import { panelSearch } from '../panel-search';
import { useOwnedRoom } from './hooks/useOwnedRoom';

const panelContent = (
  <main className="entry-page min-h-[100vh] grid content-start justify-items-center gap-4 p-6 text-center [&_code]:[overflow-wrap:anywhere]">
    <h1>Área do professor</h1>
    <RoomStatus />
    <ProfileFallbackNavigation />
  </main>
);

const loadingRoom = <p role="status">Abrindo sala…</p>;

function unavailableRoom(error: string) {
  return <Navigate replace to={teacherRoomCreation} state={{ error }} />;
}

export function TeacherPanel() {
  const { roomName: rawName } = useParams();
  const [params] = useSearchParams();
  const name = normalizeRoomName(rawName ?? null);
  const canonical = panelSearch(params);

  if (!name) return unavailableRoom('Nome da sala inválido.');
  return renderPanel(name, `?${params}` === canonical, canonical);
}

function renderPanel(name: string, canonical: boolean, search: string) {
  if (canonical) return <OwnedTeacherPanel key={name} name={name} />;
  return <Navigate replace to={{ search }} />;
}

function OwnedTeacherPanel({ name }: { name: string }) {
  const access = useOwnedRoom(name);

  if (access.status === 'loading') return loadingRoom;
  if (access.status === 'error') return unavailableRoom(access.message);
  return (
    <TeacherSession name={name} id={access.id}>
      {panelContent}
    </TeacherSession>
  );
}
