import type { RoomMission } from '../../../../../../../../../../../../../game/room-progress';
import { ProgressStatusLabel } from '../../ProgressStatusLabel/ProgressStatusLabel';

interface MissionTitleProps {
  mission: RoomMission;
}

export function MissionTitle({ mission }: MissionTitleProps) {
  return (
    <span className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
      <span className="shrink-0">Missão {mission.missionNumber}</span>
      {mission.missionTitle && (
        <span className="min-w-0 flex-1 basis-20 truncate" title={mission.missionTitle}>
          · {mission.missionTitle}
        </span>
      )}
      <ProgressStatusLabel status={mission.missionStatus} />
    </span>
  );
}
