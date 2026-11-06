import { useRoomQuestions } from './hooks/useRoomQuestions';
import { useQuestionCreation } from './hooks/useQuestionCreation';
import { QuestionFeedback } from './QuestionFeedback/QuestionFeedback';
import { QuestionCatalog } from './QuestionCatalog/QuestionCatalog';
import { QuestionHeader } from './QuestionHeader/QuestionHeader';

export function RoomQuestions() {
  const questions = useRoomQuestions();
  const creation = useQuestionCreation();

  return (
    <div className="grid gap-5">
      <QuestionHeader
        pending={questions.pending}
        ready={!!questions.snapshot}
        reload={questions.reload}
        creation={creation}
      />
      <p>
        As alterações valem para os alunos na próxima entrada na sala. Quem já está jogando mantém
        as questões carregadas.
      </p>
      <QuestionFeedback error={questions.error} message={questions.message} />
      <QuestionCatalog questions={questions} creation={creation} />
    </div>
  );
}
