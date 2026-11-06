import { Accordion } from '../../../../../../../../../../../components/Accordion/Accordion';
import type { RoomSector } from '../../../../../../../../../../../game/room-progress';
import { MissionTitle } from './MissionTitle/MissionTitle';
import { StudentMission } from './StudentMission/StudentMission';

export interface StudentSectorProps {
  sector: RoomSector;
}

export function StudentSector({ sector }: StudentSectorProps) {
  return (
    <Accordion
      label={`Missões de ${sector.sectorName}`}
      type="single"
      collapsible
      heading="h4"
      items={Object.entries(sector.missions)
        .sort(([, left], [, right]) => left.missionNumber - right.missionNumber)
        .map(([id, mission]) => ({
          value: id,
          title: <MissionTitle mission={mission} />,
          content: <StudentMission mission={mission} />,
          className: 'bg-selected',
          triggerProps: { className: '[&>span]:flex-1' },
          keepMounted: true,
        }))}
    />
  );
}
