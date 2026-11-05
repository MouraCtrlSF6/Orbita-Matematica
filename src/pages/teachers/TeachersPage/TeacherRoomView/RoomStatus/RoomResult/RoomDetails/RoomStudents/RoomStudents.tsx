import type { RoomStudent } from '../../../../../../../../game/room-progress';
import { StudentDetails } from './StudentDetails/StudentDetails';

export interface RoomStudentsProps {
  students: RoomStudent[];
}

export function RoomStudents({ students }: RoomStudentsProps) {
  return (
    <section
      className="room-students [width:min(100%,_43.75rem)] text-left [overflow-wrap:anywhere] [&_.collapsible]:my-2"
      aria-label="Alunos da sala"
    >
      <p role="status">Registros de alunos: {students.length}</p>
      {students.map((student) => (
        <StudentDetails key={student.studentId} student={student} />
      ))}
    </section>
  );
}
