import { useSession } from '../../../app/contexts/hooks/useSession';
import { StudentsPage } from './StudentsPage/StudentsPage';
import { JoinRoomPage } from './JoinRoomPage/JoinRoomPage';

export function StudentEntryPage() {
  const { studentRoom } = useSession();

  return studentRoom ? <StudentsPage room={studentRoom} /> : <JoinRoomPage />;
}
