import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Input } from './Input';
import { ControlVariant } from '../utils/control-styles';

it('preserves native form values, labeling and invalid descriptions', async () => {
  render(
    <form aria-label="Entrada">
      <label htmlFor="room">Sala</label>
      <Input
        id="room"
        name="room"
        required
        variant={ControlVariant.Invalid}
        aria-describedby="error"
      />
      <p id="error">Informe a sala.</p>
    </form>,
  );
  const input = screen.getByRole('textbox', { name: 'Sala' });

  await userEvent.type(input, 'Órbita');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAccessibleDescription('Informe a sala.');
  expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('room')).toBe('Órbita');
});
