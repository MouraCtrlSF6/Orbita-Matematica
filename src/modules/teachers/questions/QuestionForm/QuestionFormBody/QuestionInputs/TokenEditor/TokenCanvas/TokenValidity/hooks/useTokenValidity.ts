import { useState } from 'react';

function validationMessage(error: string, empty: boolean) {
  return error || (empty ? 'Adicione as peças da expressão.' : '');
}

export function useTokenValidity(required: boolean, value: string[], error: string) {
  const [attempted, setAttempted] = useState(false);
  const message = validationMessage(error, attempted && required && !value.length);
  const input = {
    onChange: () => {},
    onInvalid: () => setAttempted(true),
    ref: (node: HTMLInputElement | null) => {
      node?.setCustomValidity(error);
    },
    'aria-invalid': !!message,
  };

  return { message, input };
}
