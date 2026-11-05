import { useMissionContext } from '../hooks/useMissionContext';
import { missions } from '../../../../content/missions';
import { sectors } from '../../../../content/sectors';
import type { Mission } from '../../../../game/types';
import { MissionBack } from './MissionBack/MissionBack';
import { MissionTitleRow } from './MissionTitleRow/MissionTitleRow';

export interface MissionHeadingProps {
  onBack: () => void;
}

function sectorForMission(mission: Mission) {
  return sectors.find((item) => item.id === mission.sectorId)!;
}

export function MissionHeading({ onBack }: MissionHeadingProps) {
  const { mission, session } = useMissionContext();

  const sector = sectorForMission(mission);

  const items = missions.filter((item) => item.sectorId === mission.sectorId);

  const number = items.findIndex((item) => item.id === mission.id) + 1;

  return (
    <>
      <MissionBack onBack={onBack} />
      <MissionTitleRow sector={sector} mission={mission} number={number} total={items.length} />
      <progress
        className="mission-progress h-[0.3125rem] mt-[1.3125rem] mr-0 mb-7 ml-0"
        value={number - Number(!session.done)}
        max={items.length}
        aria-label="Progresso no setor"
      />
    </>
  );
}
