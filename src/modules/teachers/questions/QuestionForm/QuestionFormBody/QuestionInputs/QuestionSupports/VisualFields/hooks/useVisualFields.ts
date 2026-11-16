import { useState, type FormEvent } from 'react';

function visualValue(input: HTMLInputElement) {
  return input.name === 'visualLabel' ? input.value : Number(input.value);
}

export function useVisualFields() {
  const [enabled, setEnabled] = useState(false);
  const [model, setModel] = useState({ groups: 2, perGroup: 3, extra: 4, label: 'objetos' });
  const update = (event: FormEvent<HTMLFieldSetElement>) => {
    const input = event.target as HTMLInputElement;
    const key = input.name === 'visualLabel' ? 'label' : input.name;

    setModel((current) => ({ ...current, [key]: visualValue(input) }));
  };

  const toggle = (value: boolean | 'indeterminate') => setEnabled(value === true);

  return { enabled, toggle, model, update };
}
