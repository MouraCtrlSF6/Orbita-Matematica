import { Link } from 'react-router';

export function TeachersPage() {
  return (
    <main className="entry-page">
      <h1>Área do professor</h1>
      <p>Em breve, você poderá acompanhar aqui o progresso da turma.</p>
      <Link to="/sign">Voltar à escolha de perfil</Link>
    </main>
  );
}
