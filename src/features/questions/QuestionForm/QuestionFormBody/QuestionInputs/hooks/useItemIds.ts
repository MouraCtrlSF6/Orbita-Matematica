import { useState } from 'react';

export function useItemIds(initial: string[] = []) {
  const [ids, setIds] = useState(initial);
  const add = () => setIds((current) => [...current, 'item-' + crypto.randomUUID()]);
  const remove = (id: string) => setIds((current) => current.filter((item) => item !== id));

  return { ids, add, remove };
}
