interface FieldLabelProps {
  label: string;
  optional?: boolean;
}

export function FieldLabel({ label, optional = false }: FieldLabelProps) {
  return (
    <span className="font-semibold">
      {label}
      {optional ? (
        <span className="font-normal text-muted"> (opcional)</span>
      ) : (
        <span className="text-danger" aria-hidden="true">
          {' '}
          *
        </span>
      )}
    </span>
  );
}
