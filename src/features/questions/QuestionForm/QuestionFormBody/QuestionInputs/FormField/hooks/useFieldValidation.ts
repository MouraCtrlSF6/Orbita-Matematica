import { useId, useState } from 'react';

export function useFieldValidation(optional: boolean) {
  const id = useId();
  const [error, setError] = useState('');
  const control = {
    id,
    required: !optional,
    maxLength: 2000,
    'aria-invalid': !!error,
    'aria-describedby': id + '-help',
    onInvalid: () => setError('Preencha este campo corretamente.'),
    onInput: () => setError(''),
    className: 'w-full border-line',
  };

  return { id, error, control };
}
