import { render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { Select } from './Select';

const options = [
  { value: 'launch', label: 'Lançamento' },
  { value: 'base', label: 'Base', disabled: true },
];

it('exposes its label, selected value and native form value', () => {
  render(
    <form aria-label="Questão">
      <Select label="Setor" name="sector" defaultValue="launch" options={options} />
    </form>,
  );
  expect(screen.getByRole('combobox', { name: 'Setor' })).toHaveTextContent('Lançamento');
  expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('sector')).toBe('launch');
});

it('keeps controlled values and forwards disabled and descriptive trigger props', () => {
  const change = vi.fn();
  const { rerender } = render(
    <Select
      label="Setor"
      value="launch"
      onValueChange={change}
      options={options}
      disabled
      triggerProps={{ 'aria-describedby': 'help' }}
    />,
  );

  expect(screen.getByRole('combobox')).toBeDisabled();
  expect(screen.getByRole('combobox')).toHaveAttribute('aria-describedby', 'help');
  rerender(<Select label="Setor" value="base" onValueChange={change} options={options} />);
  expect(screen.getByRole('combobox')).toHaveTextContent('Base');
  expect(change).not.toHaveBeenCalled();
});
