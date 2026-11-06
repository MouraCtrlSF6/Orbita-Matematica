import { Collapsible } from '../../../../../../../../../components/Collapsible/Collapsible';
import type { RoomStudent } from '../../../../../../../../../game/room-progress';
import { RemoveStudentButton } from './RemoveStudentButton/RemoveStudentButton';
import { StudentSectors } from './StudentSectors/StudentSectors';
import { StudentLocation } from './StudentLocation/StudentLocation';

export interface StudentDetailsProps {
  student: RoomStudent;
}

export function StudentDetails({ student }: StudentDetailsProps) {
  return (
    <Collapsible title={student.name} keepMounted>
      <StudentLocation sector={student.currentSector} />
      <StudentSectors student={student} />

      <div className="mt-4 flex items-center justify-end">
        <RemoveStudentButton studentId={student.studentId} name={student.name} />
      </div>
    </Collapsible>
  );
}
