import { Tabs } from '../../../../../../../../components/Tabs/Tabs';
import { useState } from 'react';
import { ProfileBackLink } from '../../../../../ProfileBackLink/ProfileBackLink';
import type { RoomStudent } from '../../../../../../../../game/room-progress';
import { RoomSectionContent } from './RoomSectionContent/RoomSectionContent';

interface RoomSectionsProps {
  students: RoomStudent[];
}

export function RoomSections({ students }: RoomSectionsProps) {
  const [section, setSection] = useState('students');
  const items = [
    {
      value: 'students',
      label: 'Alunos',
      content: <RoomSectionContent section="students" students={students} />,
    },
    {
      value: 'questions',
      label: 'Questões',
      content: <RoomSectionContent section="questions" students={students} />,
    },
  ];

  return (
    <section className="w-full max-w-[64rem] text-left [&_input]:min-h-11 [&_input]:p-2 [&_select]:min-h-11 [&_select]:p-2 [&_select]:border [&_select]:border-line [&_select]:rounded-control [&_summary]:cursor-pointer [&_summary]:font-bold">
      <div className="mb-4">
        <ProfileBackLink />
      </div>
      <Tabs label="Seções da sala" value={section} onValueChange={setSection} items={items} />
    </section>
  );
}
