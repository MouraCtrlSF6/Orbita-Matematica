import type { RoomMission } from '../../../../../../../../../../../../game/room-progress';
import { MissionSupports } from './MissionSupports/MissionSupports';
import { MissionAnswers } from './MissionAnswers/MissionAnswers';

export interface StudentMissionProps {
  mission: RoomMission;
}

export function StudentMission({ mission }: StudentMissionProps) {
  return (
    <>
      <MissionSupports mission={mission} />
      <p className="mb-2 font-bold">Respostas</p>
      <MissionAnswers mission={mission} />
    </>
  );
}
