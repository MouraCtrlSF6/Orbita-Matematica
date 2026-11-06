import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { RadioGroup } from './RadioGroup';

it('moves selection with arrow keys, skips disabled options and submits one value', async () => {
  const user = userEvent.setup();

  render(
    <form aria-label="Resposta">
      <RadioGroup
        label="Alternativas"
        name="answer"
        defaultValue="a"
        options={[
          { value: 'a', label: 'Quatro' },
          { value: 'b', label: 'Cinco', disabled: true },
          { value: 'c', label: 'Seis' },
        ]}
      />
    </form>,
  );
  screen.getByRole('radio', { name: 'Quatro' }).focus();
  await user.keyboard('{ArrowDown>}');
  await waitFor(() => expect(screen.getByRole('radio', { name: 'Seis' })).toBeChecked());
  await user.keyboard('{/ArrowDown}');
  expect(new FormData(screen.getByRole('form') as HTMLFormElement).getAll('answer')).toEqual(['c']);
});
