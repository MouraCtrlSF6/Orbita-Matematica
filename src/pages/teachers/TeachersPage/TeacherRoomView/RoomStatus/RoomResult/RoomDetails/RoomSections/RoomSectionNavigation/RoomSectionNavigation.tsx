import { Button } from '../../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../../components/Button/button-styles';
interface RoomSectionNavigationProps {
  section: string;
  select: (section: 'students' | 'questions') => void;
}

const sections = [
  { id: 'students' as const, label: 'Alunos' },
  { id: 'questions' as const, label: 'Questões' },
];

export function RoomSectionNavigation({ section, select }: RoomSectionNavigationProps) {
  return (
    <nav aria-label="Seções da sala" className="flex gap-3 my-4">
      {sections.map((item) => (
        <Button
          variant={section === item.id ? ButtonVariant.Primary : ButtonVariant.Secondary}
          key={item.id}
          type="button"
          aria-pressed={section === item.id}
          onClick={() => select(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
}
