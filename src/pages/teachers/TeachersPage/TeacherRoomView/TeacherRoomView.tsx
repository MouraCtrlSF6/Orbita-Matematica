import { useSession } from '../../../../app/contexts/hooks/useSession';
import { CreateRoomForm } from './CreateRoomForm/CreateRoomForm';
import { RoomStatus } from './RoomStatus/RoomStatus';

export function TeacherRoomView() {
  const { teacherRoomName } = useSession();

  return teacherRoomName ? <RoomStatus /> : <CreateRoomForm />;
}
