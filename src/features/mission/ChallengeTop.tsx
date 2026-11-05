import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { useMissionContext } from './hooks/useMissionContext';

export function ChallengeTop() {
  const { mission } = useMissionContext();

  return (
    <div className="challenge-top flex items-center justify-between mb-5.5 gap-3">
      <span className="small-tag text-caption rounded-badge [background:#f1edf7] text-[#746086] py-1.5 px-[0.6875rem] ds-down-mobile:text-eyebrow">
        {mission.objective}
      </span>
      <span className="small-star text-[#b69c6c]">
        <Icon name={IconName.Star} size={20} />
      </span>
    </div>
  );
}
