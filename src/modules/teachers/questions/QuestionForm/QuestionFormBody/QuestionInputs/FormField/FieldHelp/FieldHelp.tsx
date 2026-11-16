interface FieldHelpProps {
  id: string;
  description?: string;
  error: string;
}

export function FieldHelp({ id, description, error }: FieldHelpProps) {
  return (
    <div id={id + '-help'} className="text-small">
      {description && <p className="text-muted m-0">{description}</p>}
      {error && <p className="text-danger m-0">{error}</p>}
    </div>
  );
}
