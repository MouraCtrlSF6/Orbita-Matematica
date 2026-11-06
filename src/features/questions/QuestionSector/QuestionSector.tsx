import type { Mission, Sector } from '../../../game/types';
import { SectorQuestionList } from './SectorQuestionList/SectorQuestionList';

interface QuestionSectorProps {
  sector: Sector;
  missions: Mission[];
  pending: boolean;
  remove: (id: string) => Promise<boolean>;
  reorder: (id: string, targetId: string) => Promise<boolean>;
}

export function QuestionSector({ sector, missions, ...actions }: QuestionSectorProps) {
  const items = missions.filter((mission) => mission.sectorId === sector.id);

  return <SectorQuestionList items={items} {...actions} />;
}
