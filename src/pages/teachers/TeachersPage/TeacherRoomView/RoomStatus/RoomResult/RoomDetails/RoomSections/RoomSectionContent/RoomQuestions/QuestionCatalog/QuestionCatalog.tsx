import type { useRoomQuestions } from '../hooks/useRoomQuestions';
import { QuestionCatalogContent } from './QuestionCatalogContent/QuestionCatalogContent';

interface QuestionCatalogProps {
  questions: ReturnType<typeof useRoomQuestions>;
}

export function QuestionCatalog({ questions }: QuestionCatalogProps) {
  if (!questions.snapshot)
    return (
      <p role="status">
        {questions.error
          ? 'Use Recarregar questões para tentar novamente.'
          : 'Carregando questões…'}
      </p>
    );
  return <QuestionCatalogContent questions={questions} snapshot={questions.snapshot} />;
}
