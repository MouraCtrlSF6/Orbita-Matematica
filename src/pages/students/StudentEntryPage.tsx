import { Link } from 'react-router';
import { useSession } from '../../app/contexts/hooks/useSession';
import { StudentsPage } from './StudentsPage';
import { useJoinRoom } from './hooks/useJoinRoom';
import { roomNameMaxLength } from '../../game/room-name';

function JoinButton({ joining }: { joining: boolean }) {
  return (
    <button
      className="button primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-primary:bg-primary ds-primary:text-white ds-primary:ds-hover:bg-primary-hover ds-primary:ds-hover:[transform:translateY(-0.0625rem)] ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      disabled={joining}
    >
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
    <label className="room-resume flex items-center gap-2">
      <input type="checkbox" name="resume" /> Continuar meu progresso desta aba nesta sala
    </label>
  </>
);

function RoomEntryForm() {
  const { joinRoom, joining, error } = useJoinRoom();

  return (
    <form
      className="room-entry-form grid gap-3 [width:min(100%,_26.25rem)] text-left [&_input:not([type='checkbox'])]:w-full [&_input:not([type='checkbox'])]:min-h-11 [&_input:not([type='checkbox'])]:py-2 [&_input:not([type='checkbox'])]:px-3 [&_input:not([type='checkbox'])]:[border:1px_solid_#7560a8] [&_input:not([type='checkbox'])]:rounded-control"
      action={joinRoom}
    >
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
    <main className="entry-page min-h-[100vh] grid content-center justify-items-center gap-4 p-6 text-center [&_code]:[overflow-wrap:anywhere]">
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
