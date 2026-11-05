import type { TutorialPageProps } from '../../../../tutorial-view';

function practiceMessage(answer: string): string {
  return answer === '4'
    ? 'Isso! 2 × 2 = 4. Você já fez sua primeira substituição.'
    : 'São 2 grupos de 2: 2 + 2 = 4. Tente escolher esse total.';
}

interface PracticeFeedbackProps {
  answer: TutorialPageProps['answer'];
}

export function PracticeFeedback({ answer }: PracticeFeedbackProps) {
  return (
    <div role="status">
      {answer ? (
        <p className={answer === '4' ? 'tutorial-success text-[#3c775d]' : undefined}>
          {practiceMessage(answer)}
        </p>
      ) : null}
    </div>
  );
}
