import { MissionCatalogContext } from '../../contexts/mission-catalog-context';
import type { StudentRoom } from '../../room-sync';
import { StudentGameProvider } from './contexts/StudentGameProvider/StudentGameProvider';
import { AppShell } from './AppShell/AppShell';

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
