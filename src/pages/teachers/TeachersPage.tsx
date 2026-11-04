import { Link } from 'react-router';
import { useSession } from '../../app/contexts/hooks/useSession';
import type { TeacherRoom } from '../../app/contexts/hooks/useTeacherRoom';

const connectingRoom = <p role="status">Abrindo sala…</p>;

function RoomStatus() {
  const { teacherRoom, localSessionId, retryRoom } = useSession();
  if (!teacherRoom || teacherRoom.status === 'connecting') return connectingRoom;
  return roomResult(teacherRoom, localSessionId, retryRoom);
}

function roomResult(
  teacherRoom: Exclude<TeacherRoom, { status: 'connecting' }>,
  localSessionId: string,
  retryRoom?: () => void,
) {
  if (teacherRoom.status === 'error')
    return <RoomFailure message={teacherRoom.message} retryRoom={retryRoom} />;
  return <RoomDetails roomId={localSessionId} studentCount={teacherRoom.studentCount} />;
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
  studentCount: number;
}

function RoomDetails({ roomId, studentCount }: RoomDetailsProps) {
  return (
    <>
      <p>Compartilhe o UID da sala com a turma.</p>
      <p>
        <strong>UID da sala</strong> <code>{roomId}</code>
      </p>
      <p role="status">Registros de alunos: {studentCount}</p>
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
