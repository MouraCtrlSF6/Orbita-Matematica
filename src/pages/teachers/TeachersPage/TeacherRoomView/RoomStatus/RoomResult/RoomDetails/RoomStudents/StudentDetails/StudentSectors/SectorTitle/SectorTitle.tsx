import type { RoomSector } from '../../../../../../../../../../../game/room-progress';
import { ProgressStatusLabel } from '../StudentSector/ProgressStatusLabel/ProgressStatusLabel';

interface SectorTitleProps {
  sector: RoomSector;
}

export function SectorTitle({ sector }: SectorTitleProps) {
  return (
    <span>
      {sector.sectorName} · <ProgressStatusLabel status={sector.sectorStatus} />
    </span>
  );
}
