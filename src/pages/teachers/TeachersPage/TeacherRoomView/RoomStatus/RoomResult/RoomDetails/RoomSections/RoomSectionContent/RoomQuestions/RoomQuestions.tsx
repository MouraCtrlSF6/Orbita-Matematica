import { useRoomQuestions } from './hooks/useRoomQuestions';
import { QuestionFeedback } from './QuestionFeedback/QuestionFeedback';
import { QuestionCatalog } from './QuestionCatalog/QuestionCatalog';

export function RoomQuestions() {
  const questions = useRoomQuestions();

  return (
    <div className="grid gap-5">
      <p>
        As alterações valem para os alunos na próxima entrada na sala. Quem já está jogando mantém
        as questões carregadas.
      </p>
      <QuestionFeedback error={questions.error} message={questions.message} />
      <button type="button" disabled={questions.pending} onClick={questions.reload}>
        Recarregar questões
      </button>
      <QuestionCatalog questions={questions} />
    </div>
  );
}
