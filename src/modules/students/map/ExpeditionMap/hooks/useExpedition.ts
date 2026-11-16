import { useContext } from 'react';
import { ExpeditionContext } from '../contexts/expedition-context';

export function useExpedition() {
  const expedition = useContext(ExpeditionContext);

  if (!expedition) throw new Error('ExpeditionMap is required.');
  return expedition;
}
