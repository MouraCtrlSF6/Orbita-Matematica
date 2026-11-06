import type { SectorQuestionListProps } from '../SectorQuestionList';
import { OrderedQuestionAccordion } from '../OrderedQuestionAccordion/OrderedQuestionAccordion';
import { useQuestionOrder } from '../hooks/useQuestionOrder';
import { QuestionOrderStatus } from '../QuestionOrderStatus/QuestionOrderStatus';

export function SortableQuestionList({ items, reorder, ...actions }: SectorQuestionListProps) {
  const { listRef, ...order } = useQuestionOrder(reorder, actions.pending);

  return (
    <div className="grid gap-3">
      <QuestionOrderStatus saving={order.saving} message={order.message} />
      <OrderedQuestionAccordion items={items} listRef={listRef} order={order} actions={actions} />
    </div>
  );
}
