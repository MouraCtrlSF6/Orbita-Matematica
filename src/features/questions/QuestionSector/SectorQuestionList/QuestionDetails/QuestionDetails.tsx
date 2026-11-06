import type { Mission } from '../../../../../game/types';
import { QuestionDescription } from './QuestionDescription/QuestionDescription';
import { QuestionSolution } from './QuestionSolution/QuestionSolution';
import { RemoveQuestionButton } from './RemoveQuestionButton/RemoveQuestionButton';

interface QuestionDetailsProps {
  mission: Mission;
  pending: boolean;
  remove: (id: string) => void;
}

export function QuestionDetails({ mission, pending, remove }: QuestionDetailsProps) {
  return (
    <>
      <QuestionDescription mission={mission} />
      <QuestionSolution mission={mission} />
      <RemoveQuestionButton
        id={mission.id}
        title={mission.title}
        pending={pending}
        remove={remove}
      />
    </>
  );
}
