interface SelectFieldProps {
  label: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string; disabled?: boolean }[];
}

export function SelectField({ label, options, onChange, ...input }: SelectFieldProps) {
  return (
    <label className="grid gap-1">
      {label}
      <select aria-label={label} {...input} onChange={(event) => onChange?.(event.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
