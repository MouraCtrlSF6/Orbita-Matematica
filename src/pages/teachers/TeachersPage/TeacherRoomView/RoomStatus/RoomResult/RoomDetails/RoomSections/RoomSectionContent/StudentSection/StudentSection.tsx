import type { RoomStudent } from '../../../../../../../../../../game/room-progress';
import { RoomStudents } from '../../../RoomStudents/RoomStudents';
import { ExportReportButton } from '../ExportReportButton/ExportReportButton';
interface StudentSectionProps {
  students: RoomStudent[];
}
export function StudentSection({ students }: StudentSectionProps) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2>Alunos</h2>
        <ExportReportButton students={students} />
      </div>
      <RoomStudents students={students} />
    </>
  );
}
