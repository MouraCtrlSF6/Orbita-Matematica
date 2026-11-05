import type { RoomStudent } from '../../../../../../../../../game/room-progress';
import { RoomStudents } from '../../RoomStudents/RoomStudents';
import { RoomQuestions } from './RoomQuestions/RoomQuestions';

interface RoomSectionContentProps {
  section: string;
  students: RoomStudent[];
}

export function RoomSectionContent({ section, students }: RoomSectionContentProps) {
  if (section === 'students') return <RoomStudents students={students} />;
  return <RoomQuestions />;
}
