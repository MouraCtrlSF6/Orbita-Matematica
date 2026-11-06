import type { Mission } from '../../../../../game/types';
import { QuestionDescription } from './QuestionDescription/QuestionDescription';
import { QuestionSolution } from './QuestionSolution/QuestionSolution';
import { RemoveQuestionDialog } from './RemoveQuestionDialog/RemoveQuestionDialog';

interface QuestionDetailsProps {
  mission: Mission;
  pending: boolean;
  remove: (id: string) => Promise<boolean>;
}

export function QuestionDetails({ mission, pending, remove }: QuestionDetailsProps) {
  return (
    <>
      <QuestionDescription mission={mission} />
      <QuestionSolution mission={mission} />
      <RemoveQuestionDialog
        id={mission.id}
        title={mission.title}
        pending={pending}
        remove={remove}
      />
    </>
  );
}
