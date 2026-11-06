import { useSession } from '../../../../../../../../../app/contexts/hooks/useSession';
import { Breadcrumb } from '../../../../../../../../../components/Breadcrumb/Breadcrumb';

interface RoomBreadcrumbProps {
  section: string;
}

export function RoomBreadcrumb({ section }: RoomBreadcrumbProps) {
  const { teacherRoomName } = useSession();
  const label = section === 'students' ? 'Alunos' : 'Questões';

  return (
    <div className="mb-4">
      <Breadcrumb
        items={[
          { id: 'room', label: teacherRoomName },
          { id: section, label },
        ]}
      />
    </div>
  );
}
