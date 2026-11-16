import { MissionCatalogContext } from '../../contexts/mission-catalog-context';
import type { StudentRoom } from '../../room-sync';
import { AppShell } from './AppShell/AppShell';
import { StudentGameProvider } from './contexts/StudentGameProvider/StudentGameProvider';

interface StudentsPageProps {
  room: StudentRoom;
}

export function StudentsPage({ room }: StudentsPageProps) {
  return (
    <MissionCatalogContext.Provider value={room.missions}>
      <StudentGameProvider room={room}>
        <AppShell />
      </StudentGameProvider>
    </MissionCatalogContext.Provider>
  );
}
