import { useTokenValidity } from './hooks/useTokenValidity';

interface TokenValidityProps {
  name: string;
  label: string;
  value: string[];
  required: boolean;
  error: string;
  focusId: string;
}

export function TokenValidity({
  name,
  label,
  value,
  required,
  error,
  focusId,
}: TokenValidityProps) {
  const validation = useTokenValidity(required, value, error);

  return (
    <>
      <input
        {...validation.input}
        name={name}
        value={value.join('|')}
        required={required}
        tabIndex={-1}
        aria-label={'Validação: ' + label}
        aria-describedby={focusId + '-error'}
        data-focus-id={focusId}
        className="sr-only"
      />
      <p id={focusId + '-error'} className="text-small text-danger m-0" aria-live="polite">
        {validation.message}
      </p>
    </>
  );
}
