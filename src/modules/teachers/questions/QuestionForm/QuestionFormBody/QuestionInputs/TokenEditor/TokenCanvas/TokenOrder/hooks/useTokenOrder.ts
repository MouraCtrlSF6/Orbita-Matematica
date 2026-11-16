import { useState } from 'react';

export function useTokenOrder(tokens: string[], onChange: (tokens: string[]) => void) {
  const [selected, setSelected] = useState(-1);
  const move = (direction: number) => {
    const next = [...tokens];
    const target = selected + direction;

    [next[selected], next[target]] = [next[target], next[selected]];
    onChange(next);
    setSelected(target);
  };
  const remove = () => {
    onChange(tokens.filter((_, index) => index !== selected));
    setSelected(-1);
  };

  return { selected, setSelected, move, remove };
}
