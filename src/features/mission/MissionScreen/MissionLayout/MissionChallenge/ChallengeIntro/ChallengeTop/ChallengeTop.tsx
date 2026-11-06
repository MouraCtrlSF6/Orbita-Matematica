import { Icon } from '../../../../../../../components/Icon/Icon';
import { IconName } from '../../../../../../../components/icon-names';
import { MissionObjective } from './MissionObjective/MissionObjective';

export function ChallengeTop() {
  return (
    <div className="challenge-top flex items-center justify-between mb-5.5 gap-3">
      <MissionObjective />
      <span className="small-star text-[#b69c6c]">
        <Icon name={IconName.Star} size={20} />
      </span>
    </div>
  );
}
