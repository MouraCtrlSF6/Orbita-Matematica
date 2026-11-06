import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../Button/Button';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('provides a default status and forwards sizing, classes and refs', () => {
    const ref = createRef<HTMLSpanElement>();

    render(<Spinner role="status" ref={ref} size="1.5rem" className="text-primary" />);
    const status = screen.getByRole('status');

    expect(status).toHaveTextContent('Carregando…');
    expect(ref.current).toBe(status);
    expect(status).toHaveClass('text-primary');
    expect(status.querySelector('svg')).toHaveAttribute('width', '1.5rem');
    expect(status.querySelector('svg')).toHaveAttribute('height', '1.5rem');
    expect(status.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('acts as a button label while loading and restores its regular label', async () => {
    const click = vi.fn();
    const { rerender } = render(
      <Button disabled aria-busy onClick={click}>
        <Spinner label={<span>Salvando…</span>} />
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Salvando…' });

    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    await userEvent.click(button);
    expect(click).not.toHaveBeenCalled();
    rerender(<Button onClick={click}>Salvar</Button>);
    await userEvent.click(screen.getByRole('button', { name: 'Salvar' }));
    expect(click).toHaveBeenCalledOnce();
    expect(screen.queryByText('Salvando…')).not.toBeInTheDocument();
  });
});
