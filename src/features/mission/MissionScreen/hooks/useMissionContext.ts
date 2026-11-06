import { useContext } from 'react';
import { MissionContext } from '../contexts/mission-context';

export function useMissionContext() {
  const context = useContext(MissionContext);

  if (!context) throw new Error('Mission components require a MissionProvider.');

  return context;
}
