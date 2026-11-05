import { ProfileCards } from './ProfileCards';

export function SignPage() {
  return (
    <main className="entry-page min-h-[100vh] grid content-center justify-items-center gap-4 p-6 text-center [&_code]:[overflow-wrap:anywhere]">
      <h1>Órbita Matemática</h1>
      <p>Escolha como entrar na expedição.</p>
      <ProfileCards />
    </main>
  );
}
