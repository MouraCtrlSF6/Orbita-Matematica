import { type SelectOption } from './creation-fields-types';
import { SelectOptions } from './SelectOptions';

export interface CreationSelectProps {
  label: string;
  value: string | number;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export function CreationSelect({ label, value, options, onChange }: CreationSelectProps) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <SelectOptions options={options} />
      </select>
    </label>
  );
}
