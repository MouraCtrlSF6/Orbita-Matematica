import type { RoomMission } from '../../game/room-progress';
import { statusLabels } from './statusLabels';
import { MissionSupports } from './MissionSupports';
import { MissionAnswers } from './MissionAnswers';

export interface StudentMissionProps {
  mission: RoomMission;
}

export function StudentMission({ mission }: StudentMissionProps) {
  return (
    <details>
      <summary>
        Missão {mission.missionNumber} · {statusLabels[mission.missionStatus]}
      </summary>
      <MissionSupports mission={mission} />
      <MissionAnswers mission={mission} />
    </details>
  );
}
