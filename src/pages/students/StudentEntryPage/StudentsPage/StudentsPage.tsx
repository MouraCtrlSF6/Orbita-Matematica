import type { StudentRoom } from '../../room-sync';
import { StudentGameProvider } from './contexts/StudentGameProvider/StudentGameProvider';
import { AppShell } from './AppShell/AppShell';

interface StudentsPageProps {
  room: StudentRoom;
}

export function StudentsPage({ room }: StudentsPageProps) {
  return (
    <StudentGameProvider room={room}>
      <AppShell />
    </StudentGameProvider>
  );
}
