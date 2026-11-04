import { Link } from 'react-router';

function ProfileCards() {
  return (
    <div className="profile-cards">
      <Link to="/teachers">Sou Professor</Link>
      <Link to="/students">Sou aluno</Link>
    </div>
  );
}

export function SignPage() {
  return (
    <main className="entry-page">
      <h1>Órbita Matemática</h1>
      <p>Escolha como entrar na expedição.</p>
      <ProfileCards />
    </main>
  );
}
