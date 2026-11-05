import { useState } from 'react';
import type { RoomStudent } from '../../../../../../../../game/room-progress';
import { RoomSectionNavigation } from './RoomSectionNavigation/RoomSectionNavigation';
import { RoomSectionContent } from './RoomSectionContent/RoomSectionContent';

interface RoomSectionsProps {
  students: RoomStudent[];
}

export function RoomSections({ students }: RoomSectionsProps) {
  const [section, setSection] = useState<'students' | 'questions'>('students');

  return (
    <section className="w-full max-w-[64rem] text-left [&_button]:min-h-11 [&_button]:rounded-control [&_button]:border [&_button]:border-line [&_button]:bg-white [&_button]:px-4 [&_button]:py-2 [&_button]:font-bold [&_button:disabled]:opacity-50 [&_button:hover]:bg-canvas [&_button[aria-pressed=true]]:bg-primary [&_button[aria-pressed=true]]:text-white [&_input]:min-h-11 [&_input]:p-2 [&_select]:min-h-11 [&_select]:p-2 [&_select]:border [&_select]:border-line [&_select]:rounded-control [&_summary]:cursor-pointer [&_summary]:font-bold">
      <RoomSectionNavigation section={section} select={setSection} />
      <h2>{section === 'students' ? 'Alunos' : 'Questões'}</h2>
      <RoomSectionContent section={section} students={students} />
    </section>
  );
}
