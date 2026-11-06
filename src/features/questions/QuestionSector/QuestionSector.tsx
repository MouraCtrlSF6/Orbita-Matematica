import type { Mission, Sector } from '../../../game/types';
import { SectorQuestionList } from './SectorQuestionList/SectorQuestionList';

interface QuestionSectorProps {
  sector: Sector;
  missions: Mission[];
  pending: boolean;
  remove: (id: string) => void;
}

export function QuestionSector({ sector, missions, ...actions }: QuestionSectorProps) {
  const items = missions.filter((mission) => mission.sectorId === sector.id);

  return <SectorQuestionList items={items} {...actions} />;
}
