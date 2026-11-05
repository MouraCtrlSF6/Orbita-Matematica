import type { Mission } from '../../../../game/types';
import { QuestionDetails } from './QuestionDetails/QuestionDetails';

interface SectorQuestionListProps {
  items: Mission[];
  pending: boolean;
  remove: (id: string) => void;
}

export function SectorQuestionList({ items, ...actions }: SectorQuestionListProps) {
  if (!items.length) return <p>Este setor está sem questões.</p>;
  return (
    <>
      {items.map((mission) => (
        <QuestionDetails key={mission.id} mission={mission} {...actions} />
      ))}
    </>
  );
}
