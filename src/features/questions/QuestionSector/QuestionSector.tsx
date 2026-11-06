import type { Mission, Sector } from '../../../game/types';
import { SectorQuestionList } from './SectorQuestionList/SectorQuestionList';
import { Collapsible } from '../../../components/Collapsible/Collapsible';
import { CollapsibleVariant } from '../../../components/Collapsible/collapsible-styles';

interface QuestionSectorProps {
  sector: Sector;
  missions: Mission[];
  pending: boolean;
  remove: (id: string) => void;
}

export function QuestionSector({ sector, missions, ...actions }: QuestionSectorProps) {
  const items = missions.filter((mission) => mission.sectorId === sector.id);

  return (
    <section aria-label={sector.name} className="grid gap-3">
      <Collapsible
        title={`${sector.number} — ${sector.name} · ${items.length} questões`}
        heading="h3"
        variant={CollapsibleVariant.Card}
        keepMounted
      >
        <div className="grid gap-3">
          <SectorQuestionList items={items} {...actions} />
        </div>
      </Collapsible>
    </section>
  );
}
