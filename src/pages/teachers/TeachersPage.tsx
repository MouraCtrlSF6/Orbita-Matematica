import { Link } from 'react-router';
import { TeacherRoomView } from './TeacherRoomView';

export function TeachersPage() {
  return (
    <main className="entry-page min-h-[100vh] grid content-center justify-items-center gap-4 p-6 text-center [&_code]:[overflow-wrap:anywhere]">
      <h1>Área do professor</h1>
      <TeacherRoomView />
      <Link to="/sign">Voltar à escolha de perfil</Link>
    </main>
  );
}
