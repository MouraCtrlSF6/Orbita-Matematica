import type { TutorialPageProps } from '../../../tutorial-view';
import { PracticeChoices } from './PracticeChoices/PracticeChoices';
import { PracticeFeedback } from './PracticeFeedback/PracticeFeedback';
import { FinishTutorial } from './FinishTutorial/FinishTutorial';

const practiceQuestion = (
  <>
    <h2>Vamos experimentar?</h2>
    <p>Agora temos 2 robôs: x = 2. Se cada um usa 2 cristais, quanto vale 2 × x?</p>
  </>
);

interface AlgebraPracticeProps {
  answer: TutorialPageProps['answer'];
  onAnswer: TutorialPageProps['onAnswer'];
  onFinish: TutorialPageProps['onFinish'];
}

export function AlgebraPractice(props: AlgebraPracticeProps) {
  return (
    <>
      {practiceQuestion}
      <PracticeChoices {...props} />
      <PracticeFeedback {...props} />
      <FinishTutorial {...props} />
    </>
  );
}
