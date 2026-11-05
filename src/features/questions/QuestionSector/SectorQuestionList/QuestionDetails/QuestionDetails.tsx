import type { Mission } from '../../../../../game/types';
import { QuestionDescription } from './QuestionDescription/QuestionDescription';
import { QuestionSolution } from './QuestionSolution/QuestionSolution';
import { RemoveQuestionButton } from './RemoveQuestionButton/RemoveQuestionButton';

interface QuestionDetailsProps {
  mission: Mission;
  pending: boolean;
  remove: (id: string) => void;
}

const formatNames = {
  choice: 'Alternativas',
  number: 'Resposta numérica',
  build: 'Montagem de expressão',
  create: 'Criação guiada',
};

export function QuestionDetails({ mission, pending, remove }: QuestionDetailsProps) {
  return (
    <details className="rounded-card border border-line p-4 [overflow-wrap:anywhere]">
      <summary>
        {mission.title} · {formatNames[mission.kind]}
      </summary>
      <QuestionDescription mission={mission} />
      <QuestionSolution mission={mission} />
      <RemoveQuestionButton
        id={mission.id}
        title={mission.title}
        pending={pending}
        remove={remove}
      />
    </details>
  );
}
