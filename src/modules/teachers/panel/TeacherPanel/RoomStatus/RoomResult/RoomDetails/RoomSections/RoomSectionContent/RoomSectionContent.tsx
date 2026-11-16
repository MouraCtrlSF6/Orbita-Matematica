import type { RoomStudent } from '../../../../../../../../../game/room-progress';
import { StudentSection } from '../../../../../../../students/StudentSection/StudentSection';
import { RoomQuestions } from '../../../../../../../questions/RoomQuestions/RoomQuestions';

interface RoomSectionContentProps {
  section: 'students' | 'questions';
  students: RoomStudent[];
}

export function RoomSectionContent({ section, students }: RoomSectionContentProps) {
  if (section === 'questions') return <RoomQuestions />;

  return <StudentSection students={students} />;
}
