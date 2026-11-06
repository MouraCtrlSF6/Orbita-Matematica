import type { RefObject } from 'react';
import { Accordion } from '../../../../../components/Accordion/Accordion';
import { AccordionVariant } from '../../../../../components/Accordion/accordion-styles';
import type { Mission } from '../../../../../game/types';
import type { useQuestionOrder } from '../hooks/useQuestionOrder';
import { QuestionOrderControls } from '../QuestionOrderControls/QuestionOrderControls';
import { QuestionDetails } from '../QuestionDetails/QuestionDetails';

interface OrderedQuestionAccordionProps {
  items: Mission[];
  listRef: RefObject<HTMLDivElement | null>;
  order: Omit<ReturnType<typeof useQuestionOrder>, 'listRef'>;
  actions: { pending: boolean; remove: (id: string) => Promise<boolean> };
}

export function OrderedQuestionAccordion({
  items,
  listRef,
  order,
  actions,
}: OrderedQuestionAccordionProps) {
  return (
    <Accordion
      ref={listRef}
      className="pl-12"
      aria-busy={order.busy}
      label="Questões do setor"
      type="single"
      collapsible
      heading="h4"
      variant={AccordionVariant.Card}
      items={items.map((mission, index) => questionSection(mission, index, items, order, actions))}
    />
  );
}

const formatNames = {
  choice: 'Objetiva',
  number: 'Resposta numérica',
  text: 'Discursiva',
  build: 'Montagem de expressão',
  create: 'Criação guiada',
};

function questionSection(
  mission: Mission,
  index: number,
  items: Mission[],
  order: Omit<ReturnType<typeof useQuestionOrder>, 'listRef'>,
  actions: OrderedQuestionAccordionProps['actions'],
) {
  return {
    value: mission.id,
    className: questionOrderClass(mission.id, order.sourceId, order.targetId),
    leading: (
      <QuestionOrderControls
        mission={mission}
        previous={items[index - 1]?.id}
        next={items[index + 1]?.id}
        order={order}
      />
    ),
    title: `${mission.title} · ${formatNames[mission.kind]}`,
    content: <QuestionDetails mission={mission} {...actions} />,
  };
}

function questionOrderClass(id: string, source: string | null, target: string | null) {
  if (id === source) return 'relative z-30 select-none shadow-xl ring-2 ring-primary';
  if (id === target) return 'ring-2 ring-primary';
  return undefined;
}
