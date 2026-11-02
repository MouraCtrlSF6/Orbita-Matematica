import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { mission } from '../../test/mission';
import { MissionScreen } from './MissionScreen';

describe('mission interactions', () => {
  it('offers retry feedback and completes only once a correct answer is submitted', async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();
    render(
      <MissionScreen
        mission={mission('launch-1')}
        onComplete={onComplete}
        onNext={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    await user.click(screen.getByLabelText(/5 baterias/));
    await user.click(screen.getByRole('button', { name: /Conferir/ }));
    expect(onComplete).not.toHaveBeenCalled();
    expect(screen.getByText(/Ainda não/)).toBeInTheDocument();
    await user.click(screen.getByLabelText(/6 baterias/));
    await user.click(screen.getByRole('button', { name: /Conferir/ }));
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({ attempts: 2, guided: false }),
    );
    expect(screen.getByRole('button', { name: 'Continuar exploração' })).toBeInTheDocument();
  });
  it('records requested hints, visualization and assisted completion', async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();
    render(
      <MissionScreen
        mission={mission('launch-1')}
        onComplete={onComplete}
        onNext={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Ver com objetos' }));
    expect(screen.getByLabelText('Representação com objetos')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Quero uma pista' }));
    await user.click(screen.getByRole('button', { name: 'Próximo passo' }));
    await user.click(screen.getByRole('button', { name: 'Próximo passo' }));
    await user.click(screen.getByRole('button', { name: /Entendi/ }));
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({ hints: 3, visual: true, guided: true }),
    );
  });
  it('supports creating a different problem and clears stale answers when choices change', async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();
    render(
      <MissionScreen
        mission={mission('base-5')}
        onComplete={onComplete}
        onNext={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    await user.type(screen.getByLabelText('Qual é o total?'), '10');
    await user.selectOptions(screen.getByLabelText('Quantidade de robôs (x)'), '4');
    expect(screen.getByLabelText('Qual é o total?')).toHaveValue('');
    await user.selectOptions(screen.getByLabelText('Carga da missão'), 'peças');
    expect(screen.getByText(/Cada um dos 4 robôs leva 2 peças/)).toBeInTheDocument();
    await user.type(screen.getByLabelText('Qual é o total?'), '12');
    await user.click(screen.getByRole('button', { name: /Conferir/ }));
    expect(onComplete).toHaveBeenCalledWith(
      expect.objectContaining({ creation: { context: 'peças', variable: 4 } }),
    );
  });
  it('assembles expressions with buttons and supports undo', async () => {
    const onComplete = vi.fn();
    const user = userEvent.setup();
    render(
      <MissionScreen
        mission={mission('launch-4')}
        onComplete={onComplete}
        onNext={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    await user.click(screen.getByRole('button', { name: '3' }));
    await user.click(screen.getByRole('button', { name: 'Adição' }));
    await user.click(screen.getByRole('button', { name: 'Desfazer' }));
    await user.click(screen.getByRole('button', { name: 'Multiplicação' }));
    await user.click(screen.getByRole('button', { name: 'x' }));
    await user.click(screen.getByRole('button', { name: /Conferir/ }));
    expect(onComplete).toHaveBeenCalledOnce();
  });
  it('announces missing speech support without blocking the challenge', () => {
    render(
      <MissionScreen
        mission={mission('launch-1')}
        onComplete={vi.fn()}
        onNext={vi.fn()}
        onBack={vi.fn()}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Ouvir enunciado' }));
    expect(screen.getByText(/Leitura em voz alta indisponível/)).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /6 baterias/ })).toBeEnabled();
  });
});
