interface FormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'number';
  min?: number;
  max?: number;
  defaultValue?: string | number;
  optional?: boolean;
}

export function FormField({ label, optional = false, ...input }: FormFieldProps) {
  return (
    <label className="grid gap-1">
      {label}
      <input
        className="rounded-control border border-line p-2 w-full"
        required={!optional}
        maxLength={2000}
        {...input}
      />
    </label>
  );
}
