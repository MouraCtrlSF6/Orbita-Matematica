import type { Mission } from '../../../../../game/types';
import { QuestionDescription } from './QuestionDescription/QuestionDescription';
import { QuestionSolution } from './QuestionSolution/QuestionSolution';
import { RemoveQuestionButton } from './RemoveQuestionButton/RemoveQuestionButton';
import { Collapsible } from '../../../../../components/Collapsible/Collapsible';
import { CollapsibleVariant } from '../../../../../components/Collapsible/collapsible-styles';

interface QuestionDetailsProps {
  mission: Mission;
  pending: boolean;
  remove: (id: string) => void;
}

const formatNames = {
  choice: 'Objetiva',
  number: 'Resposta numérica',
  text: 'Discursiva',
  build: 'Montagem de expressão',
  create: 'Criação guiada',
};

export function QuestionDetails({ mission, pending, remove }: QuestionDetailsProps) {
  return (
    <Collapsible
      variant={CollapsibleVariant.Card}
      title={`${mission.title} · ${formatNames[mission.kind]}`}
    >
      <QuestionDescription mission={mission} />
      <QuestionSolution mission={mission} />
      <RemoveQuestionButton
        id={mission.id}
        title={mission.title}
        pending={pending}
        remove={remove}
      />
    </Collapsible>
  );
}
