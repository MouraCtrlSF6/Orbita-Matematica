import { Link } from 'react-router';
import { useSession } from '../../app/contexts/hooks/useSession';
import type { TeacherRoom } from '../../app/contexts/hooks/useTeacherRoom';
import type { RoomStudent } from '../../game/room-progress';
import { RoomStudents } from './RoomStudents';
import { DeleteRoomButton } from './DeleteRoomButton';
import './teachers.css';

const connectingRoom = <p role="status">Abrindo sala…</p>;
const deletedRoom = <p role="status">Sala excluída.</p>;

function RoomStatus() {
  const { teacherRoom, localSessionId, retryRoom } = useSession();
  if (!teacherRoom || teacherRoom.status === 'connecting') return connectingRoom;
  if (teacherRoom.status === 'deleted') return deletedRoom;
  return roomResult(teacherRoom, localSessionId, retryRoom);
}

function roomResult(
  teacherRoom: Extract<TeacherRoom, { status: 'error' | 'ready' }>,
  localSessionId: string,
  retryRoom?: () => void,
) {
  if (teacherRoom.status === 'error')
    return <RoomFailure message={teacherRoom.message} retryRoom={retryRoom} />;
  return <RoomDetails roomId={localSessionId} students={teacherRoom.students} />;
}

interface RoomFailureProps {
  message: string;
  retryRoom?: () => void;
}

function RoomFailure({ message, retryRoom }: RoomFailureProps) {
  return (
    <>
      <p role="alert">{message}</p>
      <button className="button primary" onClick={retryRoom}>
        Tentar novamente
      </button>
    </>
  );
}

interface RoomDetailsProps {
  roomId: string;
  students: RoomStudent[];
}

function RoomCode({ roomId }: { roomId: string }) {
  return (
    <>
      <p>Compartilhe o UID da sala com a turma.</p>
      <p>
        <strong>UID da sala</strong> <code>{roomId}</code>
      </p>
    </>
  );
}

function RoomDetails({ roomId, students }: RoomDetailsProps) {
  const { deleteRoom } = useSession();
  return (
    <>
      <RoomCode roomId={roomId} />
      <RoomStudents students={students} />
      {deleteRoom && <DeleteRoomButton remove={deleteRoom} />}
    </>
  );
}

export function TeachersPage() {
  return (
    <main className="entry-page">
      <h1>Área do professor</h1>
      <RoomStatus />
      <Link to="/sign">Voltar à escolha de perfil</Link>
    </main>
  );
}
