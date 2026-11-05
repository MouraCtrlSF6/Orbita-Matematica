import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { missions } from '../../content/missions';
import { sectors } from '../../content/sectors';
import type { Mission, Sector } from '../../game/types';
interface MissionHeadingProps {
  mission: Mission;
  done: boolean;
  onBack: () => void;
}
function MissionBack({ onBack }: { onBack: () => void }) {
  return (
    <button
      className="text-button back-link inline-flex items-center justify-center gap-[0.5625rem] text-label font-semibold [background:none] text-[#6b697d] [border:0] py-2 px-0 ds-hover:underline mb-5.5 [.support-banner_&]:ml-auto [.support-banner_&]:whitespace-nowrap [.support-banner_&]:text-caption ds-down-desktop:[.support-banner_&]:ml-13.5 ds-down-tablet:[.support-banner_&]:ml-auto ds-down-mobile:[.support-banner_&]:ml-13.5 ds-down-mobile:[.support-banner_&]:-mt-2.5"
      onClick={onBack}
    >
      <Icon name={IconName.Back} size={18} />
      Voltar ao setor
    </button>
  );
}
function MissionTitle({ sector, mission }: { sector: Sector; mission: Mission }) {
  return (
    <div>
      <p className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
        SETOR {sector.number} · {sector.name.toUpperCase()}
      </p>
      <h1>{mission.title}</h1>
    </div>
  );
}
function MissionCounter({ number, total }: { number: number; total: number }) {
  return (
    <span className="mission-counter text-body font-bold whitespace-nowrap [&_span]:font-normal [&_span]:text-[#62626d] ds-down-mobile:text-small">
      Missão {number} <span>de {total}</span>
    </span>
  );
}
function MissionTitleRow({
  sector,
  mission,
  number,
  total,
}: {
  sector: Sector;
  mission: Mission;
  number: number;
  total: number;
}) {
  return (
    <div className="mission-heading flex items-center justify-between gap-5 [&_h1]:mt-2 ds-down-mobile:flex-wrap ds-down-mobile:gap-3 ds-down-mobile:[&_h1]:text-page-compact ds-down-tablet:[.large-text_&]:flex-wrap">
      <MissionTitle sector={sector} mission={mission} />
      <MissionCounter number={number} total={total} />
    </div>
  );
}
function sectorForMission(mission: Mission) {
  return sectors.find((item) => item.id === mission.sectorId)!;
}
export function MissionHeading({ mission, done, onBack }: MissionHeadingProps) {
  const sector = sectorForMission(mission);
  const items = missions.filter((item) => item.sectorId === mission.sectorId);
  const number = items.findIndex((item) => item.id === mission.id) + 1;
  return (
    <>
      <MissionBack onBack={onBack} />
      <MissionTitleRow sector={sector} mission={mission} number={number} total={items.length} />
      <progress
        className="mission-progress h-[0.3125rem] mt-[1.3125rem] mr-0 mb-7 ml-0"
        value={number - Number(!done)}
        max={items.length}
        aria-label="Progresso no setor"
      />
    </>
  );
}
