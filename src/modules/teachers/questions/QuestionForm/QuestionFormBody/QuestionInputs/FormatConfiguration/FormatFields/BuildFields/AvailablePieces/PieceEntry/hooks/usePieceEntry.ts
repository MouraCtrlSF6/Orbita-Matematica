import { useState, type ChangeEvent } from 'react';

function validPiece(piece: string, count: number) {
  return /^(?:-?\d+|x|[-+−×÷*/()])$/.test(piece.trim()) && count < 30;
}

export function usePieceEntry(onAdd: (token: string) => void, count: number) {
  const [value, setValue] = useState('');
  const add = () => {
    onAdd(value.trim());
    setValue('');
  };
  const change = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return { value, add, change, disabled: !validPiece(value, count) };
}
