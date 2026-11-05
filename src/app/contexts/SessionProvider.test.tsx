import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link, MemoryRouter, useNavigate } from 'react-router';
import { expect, it, vi } from 'vitest';
import { watchRoom } from '../../infrastructure/firebase/rooms';
import { SessionProvider } from './SessionProvider';
import { useSession } from './hooks/useSession';

vi.mock('../../infrastructure/firebase/rooms', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../infrastructure/firebase/rooms')>()),
  watchRoom: vi.fn(),
}));

function SessionProbe() {
  const { role, localSessionId, setTeacherRoomName } = useSession();
  const navigate = useNavigate();

  return (
    <>
      <output aria-label="Perfil">{role ?? 'seleção'}</output>
      <output aria-label="Sessão">{localSessionId}</output>
      <Link to="/students">Aluno</Link>
      <button onClick={() => setTeacherRoomName('turma teste')}>Confirmar sala</button>
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

it('derives the role from history and keeps the session until the application remounts', async () => {
  vi.mocked(watchRoom).mockResolvedValue(undefined);
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
  const teacher = mountSession('/teachers/');
  expect(screen.getByLabelText('Perfil')).toHaveTextContent('teacher');
  const roomId = screen.getByLabelText('Sessão').textContent;
  expect(roomId).not.toBe(session);
  expect(watchRoom).not.toHaveBeenCalled();
  await user.click(screen.getByRole('button', { name: 'Confirmar sala' }));
  await waitFor(() => expect(watchRoom).toHaveBeenCalledTimes(1));
  expect(watchRoom).toHaveBeenCalledWith(
    roomId,
    expect.any(AbortSignal),
    expect.any(Function),
    expect.any(Function),
  );
  const signal = vi.mocked(watchRoom).mock.calls[0][1];
  teacher.unmount();
  expect(signal.aborted).toBe(true);
});
