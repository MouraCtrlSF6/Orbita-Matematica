import { Accordion } from '../../../../components/Accordion/Accordion';
import { AccordionVariant } from '../../../../components/Accordion/accordion-styles';
import type { Mission } from '../../../../game/types';
import { QuestionDetails } from './QuestionDetails/QuestionDetails';

interface SectorQuestionListProps {
  items: Mission[];
  pending: boolean;
  remove: (id: string) => Promise<boolean>;
}

const formatNames = {
  choice: 'Objetiva',
  number: 'Resposta numérica',
  text: 'Discursiva',
  build: 'Montagem de expressão',
  create: 'Criação guiada',
};

export function SectorQuestionList({ items, ...actions }: SectorQuestionListProps) {
  if (!items.length) return <p>Este setor está sem questões.</p>;
  return (
    <Accordion
      label="Questões do setor"
      type="single"
      collapsible
      heading="h4"
      variant={AccordionVariant.Card}
      items={items.map((mission) => ({
        value: mission.id,
        title: `${mission.title} · ${formatNames[mission.kind]}`,
        content: <QuestionDetails mission={mission} {...actions} />,
      }))}
    />
  );
}
