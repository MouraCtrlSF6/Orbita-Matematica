import { useMissionCatalog } from '../../../pages/students/hooks/useMissionCatalog';
import type { SavedGame } from '../../../game/types';
import { BackToMap } from './BackToMap/BackToMap';
import { SummaryHeading } from './SummaryHeading/SummaryHeading';
import { SummaryProgress } from './SummaryProgress/SummaryProgress';

export interface SummaryProps {
  save: SavedGame;
  onBack: () => void;
}

export function Summary({ save, onBack }: SummaryProps) {
  const missions = useMissionCatalog();

  const count = missions.filter((mission) => save.completed[mission.id]).length;

  return (
    <section className="summary-screen [&_>_h1]:mt-2.5 [&_>_h1]:mr-0 [&_>_h1]:mb-[0.9375rem] [&_>_h1]:ml-0 [&_>_p:not(.eyebrow)]:text-muted [&_>_p:not(.eyebrow)]:text-body">
      <BackToMap onBack={onBack} />
      <SummaryHeading count={count} />
      <SummaryProgress count={count} save={save} />
    </section>
  );
}
