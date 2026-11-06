import type { RoomStudent } from '../../../../../../../../../game/room-progress';
import { RoomStudents } from '../../RoomStudents/RoomStudents';
import { RoomQuestions } from './RoomQuestions/RoomQuestions';

interface RoomSectionContentProps {
  section: 'students' | 'questions';
  students: RoomStudent[];
}

export function RoomSectionContent({ section, students }: RoomSectionContentProps) {
  if (section === 'questions') return <RoomQuestions />;

  return (
    <>
      <h2>Alunos</h2>
      <RoomStudents students={students} />
    </>
  );
}
