import { type SelectOption } from './creation-fields-types';

export interface SelectOptionsProps {
  options: SelectOption[];
}

export function SelectOptions({ options }: SelectOptionsProps) {
  return (
    <>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
}
