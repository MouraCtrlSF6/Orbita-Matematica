import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Breadcrumb } from './Breadcrumb';

it('marks the current section without inventing navigation links', () => {
  const { rerender } = render(
    <Breadcrumb
      items={[
        { id: 'room', label: 'Turma A' },
        { id: 'students', label: 'Alunos' },
      ]}
    />,
  );

  expect(screen.getByRole('navigation', { name: 'Localização atual' })).toBeInTheDocument();
  expect(screen.getByText('Alunos')).toHaveAttribute('aria-current', 'page');
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
  rerender(
    <Breadcrumb
      items={[
        { id: 'room', label: 'Turma A' },
        { id: 'questions', label: 'Questões' },
      ]}
    />,
  );
  expect(screen.getByText('Questões')).toHaveAttribute('aria-current', 'page');
});
