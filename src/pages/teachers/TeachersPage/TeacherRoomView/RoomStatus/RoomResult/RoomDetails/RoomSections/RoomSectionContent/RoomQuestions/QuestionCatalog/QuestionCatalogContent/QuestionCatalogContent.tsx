import { QuestionSectors } from './QuestionSectors/QuestionSectors';
import type { CatalogSnapshot } from '../../../../../../../../../../../../infrastructure/firebase/room-catalog';
import type { useRoomQuestions } from '../../hooks/useRoomQuestions';
import { QuestionForm } from '../../../../../../../../../../../../features/questions/QuestionForm/QuestionForm';
import type { QuestionCreation } from '../../hooks/useQuestionCreation';
import { QuestionPanel } from './QuestionPanel/QuestionPanel';

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
    <div className="relative overflow-x-clip">
      <QuestionPanel active={creation.open} className="translate-x-full">
        <QuestionForm add={questions.add} pending={questions.pending} id={creation.id} />
      </QuestionPanel>
      <QuestionPanel active={!creation.open} className="-translate-x-full">
        <QuestionSectors questions={questions} snapshot={snapshot} />
      </QuestionPanel>
    </div>
  );
}
