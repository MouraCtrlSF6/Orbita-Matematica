import { sectors } from '../../../../../../../../../../../../../content/sectors';
import type { CatalogSnapshot } from '../../../../../../../../../../../../../infrastructure/firebase/room-catalog';
import { QuestionSector } from '../../../../../../../../../../../../../features/questions/QuestionSector/QuestionSector';
import type { useRoomQuestions } from '../../../hooks/useRoomQuestions';

interface QuestionSectorsProps {
  questions: ReturnType<typeof useRoomQuestions>;
  snapshot: CatalogSnapshot;
}

export function QuestionSectors({ questions, snapshot }: QuestionSectorsProps) {
  return sectors.map((sector) => (
    <QuestionSector
      key={sector.id}
      sector={sector}
      missions={snapshot.catalog.missions}
      remove={questions.remove}
      pending={questions.pending}
    />
  ));
}
