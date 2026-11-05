import { MissionTitle } from './MissionTitle/MissionTitle';
import type { RoomMission } from '../../../../../../../../../../../../game/room-progress';
import { statusLabels } from '../statusLabels';
import { MissionSupports } from './MissionSupports/MissionSupports';
import { MissionAnswers } from './MissionAnswers/MissionAnswers';

export interface StudentMissionProps {
  mission: RoomMission;
}

export function StudentMission({ mission }: StudentMissionProps) {
  return (
    <details>
      <summary>
        Missão {mission.missionNumber} · {statusLabels[mission.missionStatus]}
      </summary>
      <MissionTitle title={mission.missionTitle} />
      <MissionSupports mission={mission} />
      <MissionAnswers mission={mission} />
    </details>
  );
}
