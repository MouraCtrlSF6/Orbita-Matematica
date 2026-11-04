import { Link } from 'react-router';
import { useSession } from '../../app/contexts/hooks/useSession';
import { StudentsPage } from './StudentsPage';
import { useJoinRoom } from './hooks/useJoinRoom';
import { roomNameMaxLength } from '../../game/room-name';
import './room-entry.css';

function JoinButton({ joining }: { joining: boolean }) {
  return (
    <button className="button primary" disabled={joining}>
      {joining ? 'Entrando…' : 'Entrar na sala'}
    </button>
  );
}

const roomNameField = (
  <>
    <label htmlFor="room-name">Nome da sala</label>
    <input id="room-name" name="roomName" required maxLength={roomNameMaxLength} />
  </>
);

const nameField = (
  <>
    <label htmlFor="student-name">Nome completo</label>
    <input id="student-name" name="studentName" required maxLength={100} autoComplete="off" />
    <label className="room-resume">
      <input type="checkbox" name="resume" /> Continuar meu progresso desta aba nesta sala
    </label>
  </>
);

function RoomEntryForm() {
  const { joinRoom, joining, error } = useJoinRoom();

  return (
    <form className="room-entry-form" action={joinRoom}>
      {roomNameField}
      {nameField}
      <JoinButton joining={joining} />
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

const roomInstructions = (
  <>
    <p>Use o nome compartilhado pelo professor para começar a expedição.</p>
    <p>O professor verá seu nome, o progresso e as respostas enviadas nesta atividade.</p>
  </>
);

function JoinRoomPage() {
  return (
    <main className="entry-page">
      <h1>Entrar na sala</h1>
      {roomInstructions}
      <RoomEntryForm />
      <Link to="/sign">Voltar à escolha de perfil</Link>
    </main>
  );
}

export function StudentEntryPage() {
  const { studentRoom } = useSession();
  return studentRoom ? <StudentsPage room={studentRoom} /> : <JoinRoomPage />;
}
