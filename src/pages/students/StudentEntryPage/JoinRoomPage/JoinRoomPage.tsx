import { Link } from 'react-router';
import { RoomEntryForm } from './RoomEntryForm/RoomEntryForm';

const roomInstructions = (
  <>
    <p>Use o nome compartilhado pelo professor para começar a expedição.</p>
    <p>O professor verá seu nome, o progresso e as respostas enviadas nesta atividade.</p>
  </>
);

export function JoinRoomPage() {
  return (
    <main className="entry-page min-h-[100vh] grid content-center justify-items-center gap-4 p-6 text-center [&_code]:[overflow-wrap:anywhere]">
      <h1>Entrar na sala</h1>
      {roomInstructions}
      <RoomEntryForm />
      <Link to="/sign">Voltar à escolha de perfil</Link>
    </main>
  );
}
