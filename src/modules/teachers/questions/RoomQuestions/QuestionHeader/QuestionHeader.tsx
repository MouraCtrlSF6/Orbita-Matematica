import { useQuestionHeading } from './hooks/useQuestionHeading';
import type { QuestionCreation } from '../hooks/useQuestionCreation';
import { QuestionBackButton } from './QuestionBackButton/QuestionBackButton';
import { QuestionListActions } from './QuestionListActions/QuestionListActions';

export interface QuestionHeaderProps {
  pending: boolean;
  loading: boolean;
  ready: boolean;
  reload: () => void;
  creation: QuestionCreation;
}

export function QuestionHeader({ creation, ...actions }: QuestionHeaderProps) {
  const headingRef = useQuestionHeading(creation.open);

  return (
    <div className="flex items-center gap-4">
      <QuestionBackButton creation={creation} />
      <h2 ref={headingRef} tabIndex={-1} className="m-0 mr-auto min-w-0">
        {creation.open ? 'Adicionar Questão' : 'Questões'}
      </h2>
      <QuestionListActions creation={creation} {...actions} />
    </div>
  );
}
