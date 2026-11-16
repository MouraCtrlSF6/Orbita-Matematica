import type { useRoomQuestions } from '../hooks/useRoomQuestions';
import { QuestionCatalogContent } from './QuestionCatalogContent/QuestionCatalogContent';
import type { QuestionCreation } from '../hooks/useQuestionCreation';

interface QuestionCatalogProps {
  questions: ReturnType<typeof useRoomQuestions>;
  creation: QuestionCreation;
}

export function QuestionCatalog({ questions, creation }: QuestionCatalogProps) {
  if (!questions.snapshot)
    return (
      <p role="status">
        {questions.error
          ? 'Use Recarregar questões para tentar novamente.'
          : 'Carregando questões…'}
      </p>
    );
  return (
    <QuestionCatalogContent
      questions={questions}
      snapshot={questions.snapshot}
      creation={creation}
    />
  );
}
