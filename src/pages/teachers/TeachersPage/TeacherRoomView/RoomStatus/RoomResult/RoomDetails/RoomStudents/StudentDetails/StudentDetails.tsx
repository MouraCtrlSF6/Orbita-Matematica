import { Collapsible } from '../../../../../../../../../components/Collapsible/Collapsible';
import type { RoomStudent } from '../../../../../../../../../game/room-progress';
import { RemoveStudentButton } from './RemoveStudentButton/RemoveStudentButton';
import { StudentSectors } from './StudentSectors/StudentSectors';

export interface StudentDetailsProps {
  student: RoomStudent;
}

export function StudentDetails({ student }: StudentDetailsProps) {
  return (
    <Collapsible title={student.name} keepMounted>
      <RemoveStudentButton studentId={student.studentId} name={student.name} />
      <p>Setor atual · {student.currentSector ?? 'Fora dos setores'}</p>
      <StudentSectors student={student} />
    </Collapsible>
  );
}
