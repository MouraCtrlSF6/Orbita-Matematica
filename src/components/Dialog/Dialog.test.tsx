import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

it('labels the modal, traps focus and restores focus when dismissed with Escape', async () => {
  const user = userEvent.setup();

  render(
    <Dialog
      title="Ajustes"
      description="Ajuste sua experiência."
      trigger={<Button>Abrir ajustes</Button>}
    >
      <Input aria-label="Nome" />
    </Dialog>,
  );
  const trigger = screen.getByRole('button', { name: 'Abrir ajustes' });

  await user.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'Ajustes' });

  expect(dialog).toHaveAccessibleDescription('Ajuste sua experiência.');
  await user.tab({ shift: true });
  expect(dialog).toContainElement(document.activeElement as HTMLElement);
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  await waitFor(() => expect(trigger).toHaveFocus());
});
