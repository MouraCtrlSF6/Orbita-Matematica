import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('defaults to a non-submitting button and forwards refs', async () => {
    const submit = vi.fn();
    const ref = createRef<HTMLButtonElement>();

    render(
      <form onSubmit={submit}>
        <Button ref={ref}>Continuar</Button>
      </form>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(submit).not.toHaveBeenCalled();
    expect(ref.current).toBe(screen.getByRole('button'));
  });

  it('preserves disabled behavior and composes links without nesting buttons', async () => {
    const click = vi.fn();

    render(
      <>
        <Button disabled onClick={click}>
          Salvar
        </Button>
        <Button asChild>
          <a href="/sign">Início</a>
        </Button>
      </>,
    );
    await userEvent.click(screen.getByRole('button'));
    expect(click).not.toHaveBeenCalled();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/sign');
    expect(screen.getByRole('link').querySelector('button')).toBeNull();
  });
});
