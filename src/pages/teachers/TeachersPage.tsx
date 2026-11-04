import { Link } from 'react-router';
import { useSession } from '../../app/contexts/hooks/useSession';
import type { TeacherRoom } from '../../app/contexts/hooks/useTeacherRoom';
import type { RoomStudent } from '../../game/room-progress';
import { RoomStudents } from './RoomStudents';
import { DeleteRoomButton } from './DeleteRoomButton';
import { CreateRoomForm } from './CreateRoomForm';
import './teachers.css';

const connectingRoom = <p role="status">Abrindo sala…</p>;
const deletedRoom = <p role="status">Sala excluída.</p>;

function RoomStatus() {
  const { teacherRoom, retryRoom } = useSession();
  if (!teacherRoom || teacherRoom.status === 'connecting') return connectingRoom;
  if (teacherRoom.status === 'deleted') return deletedRoom;
  return roomResult(teacherRoom, retryRoom);
}

function roomResult(
  teacherRoom: Extract<TeacherRoom, { status: 'error' | 'ready' }>,
  retryRoom?: () => void,
) {
  if (teacherRoom.status === 'error')
    return <RoomFailure message={teacherRoom.message} retryRoom={retryRoom} />;
  return <RoomDetails students={teacherRoom.students} />;
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
  students: RoomStudent[];
}

function RoomName() {
  const { teacherRoomName } = useSession();
  return (
    <>
      <p>Compartilhe o nome da sala com a turma.</p>
      <p>
        <strong>Nome da sala</strong> <code>{teacherRoomName}</code>
      </p>
    </>
  );
}

function RoomDetails({ students }: RoomDetailsProps) {
  const { deleteRoom } = useSession();
  return (
    <>
      <RoomName />
      <RoomStudents students={students} />
      {deleteRoom && <DeleteRoomButton remove={deleteRoom} />}
    </>
  );
}

function TeacherRoomView() {
  const { teacherRoomName } = useSession();
  return teacherRoomName ? <RoomStatus /> : <CreateRoomForm />;
}

export function TeachersPage() {
  return (
    <main className="entry-page">
      <h1>Área do professor</h1>
      <TeacherRoomView />
      <Link to="/sign">Voltar à escolha de perfil</Link>
    </main>
  );
}
