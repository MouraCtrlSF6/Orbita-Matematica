import { sectors } from '../../../../../../../../../../content/sectors';
import type { RoomStudent } from '../../../../../../../../../../game/room-progress';
import { StudentSector } from './StudentSector/StudentSector';

export interface StudentSectorsProps {
  student: RoomStudent;
}

export function StudentSectors({ student }: StudentSectorsProps) {
  return sectors.map(({ id }) => {
    const sector = student.sectors[id];

    return sector ? <StudentSector key={id} sector={sector} /> : null;
  });
}
