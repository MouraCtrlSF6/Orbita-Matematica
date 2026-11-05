import { sectors } from '../../../../../../../../../../../../content/sectors';
import type { CatalogSnapshot } from '../../../../../../../../../../../../infrastructure/firebase/room-catalog';
import type { useRoomQuestions } from '../../hooks/useRoomQuestions';
import { QuestionSector } from '../../../../../../../../../../../../features/questions/QuestionSector/QuestionSector';
import { QuestionForm } from '../../../../../../../../../../../../features/questions/QuestionForm/QuestionForm';

interface QuestionCatalogContentProps {
  questions: ReturnType<typeof useRoomQuestions>;
  snapshot: CatalogSnapshot;
}

export function QuestionCatalogContent({ questions, snapshot }: QuestionCatalogContentProps) {
  return (
    <>
      <QuestionForm add={questions.add} pending={questions.pending} />
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
