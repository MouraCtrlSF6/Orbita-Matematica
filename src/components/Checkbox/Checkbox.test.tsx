import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

it('submits named values and supports toggling through its label', async () => {
  render(
    <form aria-label="Preferências">
      <Checkbox label="Continuar progresso" name="resume" value="yes" />
    </form>,
  );
  const form = screen.getByRole('form') as HTMLFormElement;

  expect(new FormData(form).has('resume')).toBe(false);
  await userEvent.click(screen.getByText('Continuar progresso'));
  expect(screen.getByRole('checkbox')).toBeChecked();
  expect(new FormData(form).get('resume')).toBe('yes');
});

it('reports indeterminate transitions and respects a disabled control', async () => {
  const change = vi.fn();
  const { rerender } = render(
    <Checkbox label="Todos" checked="indeterminate" onCheckedChange={change} />,
  );

  expect(screen.getByRole('checkbox')).toBePartiallyChecked();
  await userEvent.click(screen.getByRole('checkbox'));
  expect(change).toHaveBeenCalledWith(true);
  rerender(<Checkbox label="Todos" checked={false} disabled onCheckedChange={change} />);
  change.mockClear();
  await userEvent.click(screen.getByText('Todos'));
  expect(change).not.toHaveBeenCalled();
});
