import { sectors } from '../../../../../../../../../../../../content/sectors';
import type { CatalogSnapshot } from '../../../../../../../../../../../../infrastructure/firebase/room-catalog';
import type { useRoomQuestions } from '../../hooks/useRoomQuestions';
import { QuestionSector } from '../../../../../../../../../../../../features/questions/QuestionSector/QuestionSector';
import { QuestionForm } from '../../../../../../../../../../../../features/questions/QuestionForm/QuestionForm';
import type { QuestionCreation } from '../../hooks/useQuestionCreation';

interface QuestionCatalogContentProps {
  questions: ReturnType<typeof useRoomQuestions>;
  snapshot: CatalogSnapshot;
  creation: QuestionCreation;
}

export function QuestionCatalogContent({
  questions,
  snapshot,
  creation,
}: QuestionCatalogContentProps) {
  return (
    <>
      <QuestionForm
        add={questions.add}
        pending={questions.pending}
        id={creation.id}
        open={creation.open}
      />
      {sectors.map((sector) => (
        <QuestionSector
          key={sector.id}
          sector={sector}
          missions={snapshot.catalog.missions}
          remove={questions.remove}
          pending={questions.pending}
        />
      ))}
    </>
  );
}
