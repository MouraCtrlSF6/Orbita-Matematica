import { useState } from 'react';
import { useItemIds } from '../../../../../hooks/useItemIds';

export function useChoices() {
  const items = useItemIds(['option-1', 'option-2']);
  const [correct, setCorrect] = useState('option-1');
  const remove = (id: string) => {
    items.remove(id);
    if (correct === id) setCorrect('');
  };

  return { ids: items.ids, correct, select: setCorrect, remove, add: items.add };
}
