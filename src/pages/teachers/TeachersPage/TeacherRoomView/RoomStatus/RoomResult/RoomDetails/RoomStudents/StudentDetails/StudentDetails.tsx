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
      <p>
        Setor atual ·{' '}
        <span className="text-focus font-bold">{student.currentSector ?? 'Fora dos setores'}</span>
      </p>
      <StudentSectors student={student} />

      <div className="mt-4 flex items-center justify-end">
        <RemoveStudentButton studentId={student.studentId} name={student.name} />
      </div>
    </Collapsible>
  );
}
