import type { RoomSector } from '../../../../../../../../../../../game/room-progress';
import { statusLabels } from './statusLabels';
import { StudentMission } from './StudentMission/StudentMission';

export interface StudentSectorProps {
  sector: RoomSector;
}

export function StudentSector({ sector }: StudentSectorProps) {
  return (
    <details>
      <summary>
        {sector.sectorName} · {statusLabels[sector.sectorStatus]}
      </summary>
      {Object.entries(sector.missions)
        .sort(([, left], [, right]) => left.missionNumber - right.missionNumber)
        .map(([id, mission]) => (
          <StudentMission key={id} mission={mission} />
        ))}
    </details>
  );
}
