import type { RoomStudent } from '../../game/room-progress';
import { StudentDetails } from './StudentDetails';

export interface RoomStudentsProps {
  students: RoomStudent[];
}

export function RoomStudents({ students }: RoomStudentsProps) {
  return (
    <section
      className="room-students [width:min(100%,_43.75rem)] text-left [overflow-wrap:anywhere] [&_details]:[margin-block:0.5rem] [&_details]:py-2 [&_details]:px-3 [&_details]:[border:1px_solid_#cbbce4] [&_details]:rounded-option [&_summary]:cursor-pointer"
      aria-label="Alunos da sala"
    >
      <p role="status">Registros de alunos: {students.length}</p>
      {students.map((student) => (
        <StudentDetails key={student.studentId} student={student} />
      ))}
    </section>
  );
}
