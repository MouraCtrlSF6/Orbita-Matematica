import { Accordion } from '../../../../../../../../../../../../../components/Accordion/Accordion';
import { AccordionVariant } from '../../../../../../../../../../../../../components/Accordion/accordion-styles';
import { sectors } from '../../../../../../../../../../../../../content/sectors';
import type { CatalogSnapshot } from '../../../../../../../../../../../../../infrastructure/firebase/room-catalog';
import { QuestionSector } from '../../../../../../../../../../../../../features/questions/QuestionSector/QuestionSector';
import type { useRoomQuestions } from '../../../hooks/useRoomQuestions';

interface QuestionSectorsProps {
  questions: ReturnType<typeof useRoomQuestions>;
  snapshot: CatalogSnapshot;
}

export function QuestionSectors({ questions, snapshot }: QuestionSectorsProps) {
  return (
    <Accordion
      label="Setores de questões"
      type="single"
      collapsible
      variant={AccordionVariant.Card}
      items={sectors.map((sector) => ({
        value: sector.id,
        title: `${sector.number} — ${sector.name} · ${snapshot.catalog.missions.filter((mission) => mission.sectorId === sector.id).length} questões`,
        keepMounted: true,
        content: (
          <QuestionSector
            sector={sector}
            missions={snapshot.catalog.missions}
            remove={questions.remove}
            pending={questions.pending}
          />
        ),
      }))}
    />
  );
}
