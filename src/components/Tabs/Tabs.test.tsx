import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Tabs } from './Tabs';

const items = [
  { value: 'students', label: 'Alunos', content: 'Lista de alunos' },
  { value: 'disabled', label: 'Indisponível', content: 'Bloqueado', disabled: true },
  { value: 'questions', label: 'Questões', content: 'Lista de questões' },
];

it('associates panels and switches using keyboard while skipping disabled tabs', async () => {
  render(<Tabs label="Sala" defaultValue="students" items={items} />);
  screen.getByRole('tab', { name: 'Alunos' }).focus();
  await userEvent.keyboard('{ArrowRight}');
  expect(screen.getByRole('tab', { name: 'Questões' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('tabpanel')).toHaveAccessibleName('Questões');
  expect(screen.getByRole('tabpanel')).toHaveTextContent('Lista de questões');
});

it('keeps controlled selection owned by the caller', async () => {
  const change = vi.fn();

  render(<Tabs label="Sala" value="students" onValueChange={change} items={items} />);
  await userEvent.click(screen.getByRole('tab', { name: 'Questões' }));
  expect(change).toHaveBeenCalledWith('questions');
  expect(screen.getByRole('tab', { name: 'Alunos' })).toHaveAttribute('aria-selected', 'true');
});
