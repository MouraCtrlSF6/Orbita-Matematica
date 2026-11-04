import { Link } from 'react-router';
import { useSession } from '../../app/contexts/hooks/useSession';
import { StudentsPage } from './StudentsPage';
import { useJoinRoom } from './hooks/useJoinRoom';
import './room-entry.css';

function JoinButton({ joining }: { joining: boolean }) {
  return (
    <button className="button primary" disabled={joining}>
      {joining ? 'Entrando…' : 'Entrar na sala'}
    </button>
  );
}

const roomIdField = (
  <>
    <label htmlFor="room-id">UID da sala</label>
    <input id="room-id" name="roomId" required autoCapitalize="none" spellCheck={false} />
  </>
);

function RoomEntryForm() {
  const { joinRoom, joining, error } = useJoinRoom();

  return (
    <form className="room-entry-form" action={joinRoom}>
      {roomIdField}
      <JoinButton joining={joining} />
      {error && <p role="alert">{error}</p>}
    </form>
  );
}

function JoinRoomPage() {
  return (
    <main className="entry-page">
      <h1>Entrar na sala</h1>
      <p>Use o UID compartilhado pelo professor para começar a expedição.</p>
      <RoomEntryForm />
      <Link to="/sign">Voltar à escolha de perfil</Link>
    </main>
  );
}

export function StudentEntryPage() {
  const { studentRoomId } = useSession();
  return studentRoomId ? <StudentsPage /> : <JoinRoomPage />;
}
