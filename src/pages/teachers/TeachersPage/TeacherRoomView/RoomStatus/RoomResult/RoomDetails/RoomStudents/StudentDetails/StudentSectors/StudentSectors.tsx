import type { RoomStudent } from '../../../../../../../../../../game/room-progress';
import { StudentSector } from './StudentSector/StudentSector';

export interface StudentSectorsProps {
  student: RoomStudent;
}

export function StudentSectors({ student }: StudentSectorsProps) {
  return Object.entries(student.sectors).map(([id, sector]) => (
    <StudentSector key={id} sector={sector} />
  ));
}
