import { useState, type ChangeEvent } from 'react';

export function useNumberPiece(onAdd: (token: string) => void) {
  const [value, setValue] = useState('');
  const add = () => {
    onAdd(value);
    setValue('');
  };
  const change = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return { value, add, change, disabled: !/^-?\d+$/.test(value) };
}
