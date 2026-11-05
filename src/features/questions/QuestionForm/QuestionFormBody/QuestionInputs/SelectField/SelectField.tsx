import { useId } from 'react';
import { Select, type SelectProps } from '../../../../../../components/Select/Select';

interface SelectFieldProps extends Omit<SelectProps, 'onValueChange'> {
  onChange?: (value: string) => void;
}

export function SelectField({
  label,
  options,
  onChange,
  id,
  defaultValue = options[0]?.value,
  ...input
}: SelectFieldProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  return (
    <div className="grid gap-1">
      <label htmlFor={controlId}>{label}</label>
      <Select
        {...input}
        id={controlId}
        label={label}
        options={options}
        defaultValue={defaultValue}
        onValueChange={onChange}
      />
    </div>
  );
}
