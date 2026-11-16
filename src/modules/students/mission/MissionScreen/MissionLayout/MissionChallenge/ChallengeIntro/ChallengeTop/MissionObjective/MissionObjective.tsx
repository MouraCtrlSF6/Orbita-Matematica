import { useMissionContext } from '../../../../../hooks/useMissionContext';

export function MissionObjective() {
  const { mission } = useMissionContext();

  if (!mission.objective) return null;
  return (
    <span className="small-tag text-caption rounded-badge bg-selected text-primary-hover py-1.5 px-3">
      {mission.objective}
    </span>
  );
}
