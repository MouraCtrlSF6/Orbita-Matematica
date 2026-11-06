import { Tabs, type TabItem } from '../../../../../../../../components/Tabs/Tabs';
import { ProfileBackLink } from '../../../../../ProfileBackLink/ProfileBackLink';
import type { RoomStudent } from '../../../../../../../../game/room-progress';
import { RoomSectionContent } from './RoomSectionContent/RoomSectionContent';
import { RoomTab, useRoomTabs } from './hooks/useRoomTabs';

interface RoomSectionsProps {
  students: RoomStudent[];
}

export function RoomSections({ students }: RoomSectionsProps) {
  const tabs = useRoomTabs();
  const items = roomTabItems(students, tabs.visited);

  return (
    <section className="w-full max-w-[64rem] text-left [&_input]:min-h-11 [&_input]:p-2 [&_select]:min-h-11 [&_select]:p-2 [&_select]:border [&_select]:border-line [&_select]:rounded-control [&_summary]:cursor-pointer [&_summary]:font-bold">
      <div className="mb-4">
        <ProfileBackLink />
      </div>
      <Tabs label="Seções da sala" value={tabs.section} onValueChange={tabs.select} items={items} />
    </section>
  );
}

function roomTabItems(students: RoomStudent[], visited: RoomTab[]): TabItem[] {
  return [
    {
      value: RoomTab.Students,
      label: 'Alunos',
      content: <RoomSectionContent section={RoomTab.Students} students={students} />,
      keepMounted: visited.includes(RoomTab.Students),
    },
    {
      value: RoomTab.Questions,
      label: 'Questões',
      content: <RoomSectionContent section={RoomTab.Questions} students={students} />,
      keepMounted: visited.includes(RoomTab.Questions),
    },
  ];

}
