interface TextAreaFieldProps {
  label: string;
  name: string;
  required?: boolean;
}

export function TextAreaField({ label, ...input }: TextAreaFieldProps) {
  return (
    <label className="grid gap-1">
      {label}
      <textarea
        {...input}
        rows={4}
        maxLength={4000}
        className="border border-line rounded-control p-2"
      />
    </label>
  );
}
