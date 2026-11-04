import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter, useNavigate } from 'react-router';
import { expect, it } from 'vitest';
import { SessionProvider } from './SessionProvider';
import { useSession } from './hooks/useSession';

function SessionProbe() {
  const { role, localSessionId } = useSession();
  const navigate = useNavigate();

  return (
    <>
      <output aria-label="Perfil">{role ?? 'seleção'}</output>
      <output aria-label="Sessão">{localSessionId}</output>
      <Link to="/students">Aluno</Link>
      <button onClick={() => void navigate(-1)}>Voltar</button>
      <button onClick={() => void navigate(1)}>Avançar</button>
    </>
  );
}

function mountSession(path: string) {
  return render(
    <MemoryRouter basename="/Orbita-Matem-tica" initialEntries={[`/Orbita-Matem-tica${path}`]}>
      <SessionProvider>
        <SessionProbe />
      </SessionProvider>
    </MemoryRouter>,
  );
}

it('deriva o perfil do histórico e mantém a sessão até remontar o aplicativo', async () => {
  const user = userEvent.setup();
  const { unmount } = mountSession('/sign');
  const session = screen.getByLabelText('Sessão').textContent;
  expect(session).toBeTruthy();
  expect(screen.getByLabelText('Perfil')).toHaveTextContent('seleção');

  await user.click(screen.getByRole('link', { name: 'Aluno' }));
  expect(screen.getByLabelText('Perfil')).toHaveTextContent('student');
  await user.click(screen.getByRole('button', { name: 'Voltar' }));
  expect(screen.getByLabelText('Perfil')).toHaveTextContent('seleção');
  await user.click(screen.getByRole('button', { name: 'Avançar' }));
  expect(screen.getByLabelText('Perfil')).toHaveTextContent('student');
  expect(screen.getByLabelText('Sessão').textContent).toBe(session);

  unmount();
  mountSession('/teachers/');
  expect(screen.getByLabelText('Perfil')).toHaveTextContent('teacher');
  expect(screen.getByLabelText('Sessão').textContent).not.toBe(session);
});
