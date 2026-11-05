import { type Mission, type MissionResult } from '../../game/types';
import { MissionProvider } from './contexts/MissionProvider';
import { MissionHeading } from './MissionHeading';
import type { MissionActivity } from '../../game/room-progress';
import { MissionLayout } from './MissionLayout';

export interface MissionScreenProps {
  mission: Mission;
  onComplete: (result: MissionResult) => void;
  onNext: () => void;
  onBack: () => void;
  onActivity?: (activity: MissionActivity) => void;
}

export function MissionScreen({
  mission,
  onComplete,
  onNext,
  onBack,
  onActivity,
}: MissionScreenProps) {
  return (
    <MissionProvider
      mission={mission}
      onComplete={onComplete}
      onActivity={onActivity}
      onNext={onNext}
    >
      <div className="mission-screen">
        <MissionHeading onBack={onBack} />
        <MissionLayout />
      </div>
    </MissionProvider>
  );
}
