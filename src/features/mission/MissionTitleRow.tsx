import type { Mission, Sector } from '../../game/types';
import { MissionTitle } from './MissionTitle';
import { MissionCounter } from './MissionCounter';

export interface MissionTitleRowProps {
  sector: Sector;
  mission: Mission;
  number: number;
  total: number;
}

export function MissionTitleRow({ sector, mission, number, total }: MissionTitleRowProps) {
  return (
    <div className="mission-heading flex items-center justify-between gap-5 [&_h1]:mt-2 ds-down-mobile:flex-wrap ds-down-mobile:gap-3 ds-down-mobile:[&_h1]:text-page-compact ds-down-tablet:[.large-text_&]:flex-wrap">
      <MissionTitle sector={sector} mission={mission} />
      <MissionCounter number={number} total={total} />
    </div>
  );
}
