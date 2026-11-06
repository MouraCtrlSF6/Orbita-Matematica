import { Collapsible } from '../../../../../../../../../../../components/Collapsible/Collapsible';
import type { RoomSector } from '../../../../../../../../../../../game/room-progress';
import { SectorTitle } from './SectorTitle/SectorTitle';
import { StudentMission } from './StudentMission/StudentMission';

export interface StudentSectorProps {
  sector: RoomSector;
}

export function StudentSector({ sector }: StudentSectorProps) {
  return (
    <Collapsible title={<SectorTitle sector={sector} />} keepMounted>
      {Object.entries(sector.missions)
        .sort(([, left], [, right]) => left.missionNumber - right.missionNumber)
        .map(([id, mission]) => (
          <StudentMission key={id} mission={mission} />
        ))}
    </Collapsible>
  );
}
