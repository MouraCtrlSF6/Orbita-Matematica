import { type SelectOption } from '../../creation-fields-types';
import { useId } from 'react';
import { Select } from '../../../../../../../../../../components/Select/Select';

export interface CreationSelectProps {
  label: string;
  value: string | number;
  options: SelectOption[];
  onChange: (value: string) => void;
}

export function CreationSelect({ label, value, options, onChange }: CreationSelectProps) {
  const id = useId();
  const items = options.map((option) => ({ ...option, value: String(option.value) }));

  return (
    <label htmlFor={id}>
      {label}
      <Select
        id={id}
        label={label}
        value={String(value)}
        options={items}
        onValueChange={onChange}
        className="mt-[0.4375rem] p-3 text-[#62516f]"
      />
    </label>
  );
}
