import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { SelectField } from './SelectField';

const options = [
  { value: 'launch', label: 'Lançamento' },
  { value: 'base', label: 'Base' },
];

it('labels the shared trigger and submits the first option by default', () => {
  render(
    <form aria-label="Questão">
      <SelectField label="Setor" name="sectorId" options={options} />
    </form>,
  );
  expect(screen.getByRole('combobox', { name: 'Setor' })).toHaveTextContent('Lançamento');
  expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('sectorId')).toBe('launch');
  expect(screen.getByLabelText('Setor', { selector: 'button' })).toBe(screen.getByRole('combobox'));
});

it('preserves explicit defaults, controlled values and disabled fieldsets', () => {
  const { rerender } = render(<SelectField label="Setor" defaultValue="base" options={options} />);

  expect(screen.getByRole('combobox')).toHaveTextContent('Base');
  rerender(
    <fieldset disabled>
      <SelectField label="Formato" value="launch" options={options} />
    </fieldset>,
  );
  expect(screen.getByRole('combobox')).toHaveTextContent('Lançamento');
  expect(screen.getByRole('combobox')).toBeDisabled();
});
