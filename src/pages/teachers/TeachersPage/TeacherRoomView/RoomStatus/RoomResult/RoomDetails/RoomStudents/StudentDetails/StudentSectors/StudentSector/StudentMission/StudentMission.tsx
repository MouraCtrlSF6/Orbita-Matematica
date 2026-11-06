import { Collapsible } from '../../../../../../../../../../../../components/Collapsible/Collapsible';
import { MissionTitle } from './MissionTitle/MissionTitle';
import type { RoomMission } from '../../../../../../../../../../../../game/room-progress';
import { MissionSupports } from './MissionSupports/MissionSupports';
import { MissionAnswers } from './MissionAnswers/MissionAnswers';

export interface StudentMissionProps {
  mission: RoomMission;
}

export function StudentMission({ mission }: StudentMissionProps) {
  return (
    <Collapsible
      title={<MissionTitle mission={mission} />}
      className="bg-selected"
      triggerProps={{ className: '[&>span]:flex-1' }}
      keepMounted
    >
      <MissionSupports mission={mission} />
      <p className="mb-2 font-bold">Respostas</p>
      <MissionAnswers mission={mission} />
    </Collapsible>
  );
}
