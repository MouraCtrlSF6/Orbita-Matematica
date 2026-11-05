import { Link } from 'react-router';

function ProfileCards() {
  return (
    <div className="profile-cards grid [grid-template-columns:repeat(auto-fit,_minmax(min(100%,_13.75rem),_1fr))] gap-5 [width:min(100%,_31.25rem)] mt-3 [&_a]:grid [&_a]:place-items-center [&_a]:min-h-32.5 [&_a]:p-5 [&_a]:[border:1px_solid_#cbbce4] [&_a]:rounded-dialog [&_a]:bg-white [&_a]:text-ink [&_a]:text-profile [&_a]:font-bold [&_a]:no-underline [&_a:hover]:bg-selected [&_a:hover]:underline">
      <Link to="/teachers">Sou Professor</Link>
      <Link to="/students">Sou aluno</Link>
    </div>
  );
}

export function SignPage() {
  return (
    <main className="entry-page min-h-[100vh] grid content-center justify-items-center gap-4 p-6 text-center [&_code]:[overflow-wrap:anywhere]">
      <h1>Órbita Matemática</h1>
      <p>Escolha como entrar na expedição.</p>
      <ProfileCards />
    </main>
  );
}
