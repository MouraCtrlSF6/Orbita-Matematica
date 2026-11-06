import { useState } from 'react';

export function useHintFields() {
  const [count, setCount] = useState(1);
  const add = () => setCount((current) => current + 1);

  return { count, add };
}
