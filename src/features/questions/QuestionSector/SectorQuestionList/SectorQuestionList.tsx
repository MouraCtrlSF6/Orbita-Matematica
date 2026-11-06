import { SortableQuestionList } from './SortableQuestionList/SortableQuestionList';
import type { Mission } from '../../../../game/types';

export interface SectorQuestionListProps {
  items: Mission[];
  pending: boolean;
  remove: (id: string) => Promise<boolean>;
  reorder: (id: string, targetId: string) => Promise<boolean>;
}

export function SectorQuestionList(props: SectorQuestionListProps) {
  if (!props.items.length) return <p>Este setor está sem questões.</p>;
  return <SortableQuestionList {...props} />;
}
