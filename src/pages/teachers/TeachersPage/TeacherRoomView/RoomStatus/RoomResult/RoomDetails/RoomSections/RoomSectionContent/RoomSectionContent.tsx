import type { RoomStudent } from '../../../../../../../../../game/room-progress';
import { RoomStudents } from '../../RoomStudents/RoomStudents';
import { RoomQuestions } from './RoomQuestions/RoomQuestions';

interface RoomSectionContentProps {
  section: 'students' | 'questions';
  students: RoomStudent[];
}

export function RoomSectionContent({ section, students }: RoomSectionContentProps) {
  return (
    <>
      <h2>{section === 'students' ? 'Alunos' : 'Questões'}</h2>
      {section === 'students' ? <RoomStudents students={students} /> : <RoomQuestions />}
    </>
  );
}
