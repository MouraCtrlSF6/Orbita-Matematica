import type { ReactNode } from 'react';
import type { Mission, MissionResult } from '../../../game/types';
import type { MissionActivity } from '../../../game/room-progress';
import { useMission } from '../hooks/useMission';
import { MissionContext } from './mission-context';

interface MissionProviderProps {
  mission: Mission;
  onComplete: (result: MissionResult) => void;
  onActivity?: (activity: MissionActivity) => void;
  onNext: () => void;
  children: ReactNode;
}

export function MissionProvider({
  mission,
  onComplete,
  onActivity,
  onNext,
  children,
}: MissionProviderProps) {
  const session = useMission(mission, onComplete, onActivity);

  const value = {
    mission,
    session,
    onNext,
  };

  return <MissionContext.Provider value={value}>{children}</MissionContext.Provider>;
}
