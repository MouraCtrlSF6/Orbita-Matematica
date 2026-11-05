import type { Mission, Sector } from '../../../../../../game/types';

export interface MissionTitleProps {
  sector: Sector;
  mission: Mission;
}

export function MissionTitle({ sector, mission }: MissionTitleProps) {
  return (
    <div>
      <p className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
        SETOR {sector.number} · {sector.name.toUpperCase()}
      </p>
      <h1>{mission.title}</h1>
    </div>
  );
}
