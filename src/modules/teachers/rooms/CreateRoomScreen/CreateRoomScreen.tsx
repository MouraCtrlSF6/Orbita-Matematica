import { Link, useLocation } from 'react-router';
import { CreateRoomForm } from './CreateRoomForm/CreateRoomForm';

export function CreateRoomScreen() {
  return (
    <main className="entry-page min-h-[100vh] grid content-center justify-items-center gap-4 p-6 text-center">
      <h1>Área do professor</h1>
      <RoomEntryError />
      <CreateRoomForm />
      <Link to="/sign">Voltar à escolha de perfil</Link>
    </main>
  );
}

function RoomEntryError() {
  const { state } = useLocation();
  return typeof state?.error === 'string' ? <p role="alert">{state.error}</p> : null;
}
