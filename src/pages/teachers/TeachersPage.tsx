import { Link } from 'react-router';
import { useSession } from '../../app/contexts/hooks/useSession';
import type { TeacherRoom } from '../../app/contexts/hooks/useTeacherRoom';
import type { RoomStudent } from '../../game/room-progress';
import { RoomStudents } from './RoomStudents';
import { DeleteRoomButton } from './DeleteRoomButton';
import { CreateRoomForm } from './CreateRoomForm';

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
      <button
        className="button primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-primary:bg-primary ds-primary:text-white ds-primary:ds-hover:bg-primary-hover ds-primary:ds-hover:[transform:translateY(-0.0625rem)] ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        onClick={retryRoom}
      >
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
    <main className="entry-page min-h-[100vh] grid content-center justify-items-center gap-4 p-6 text-center [&_code]:[overflow-wrap:anywhere]">
      <h1>Área do professor</h1>
      <TeacherRoomView />
      <Link to="/sign">Voltar à escolha de perfil</Link>
    </main>
  );
}
