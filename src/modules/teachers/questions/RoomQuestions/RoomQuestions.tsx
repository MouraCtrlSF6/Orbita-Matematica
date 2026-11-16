import { QuestionDescription } from './QuestionDescription/QuestionDescription';
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
        loading={questions.loading}
        ready={!!questions.snapshot}
        reload={questions.reload}
        creation={creation}
      />
      <QuestionDescription creating={creation.open} />
      <QuestionFeedback error={questions.error} message={questions.message} />
      <QuestionCatalog questions={questions} creation={creation} />
    </div>
  );
}
