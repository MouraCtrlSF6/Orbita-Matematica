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
    <button className="text-button back-link" onClick={onBack}>
      <Icon name={IconName.Back} size={18} />
      Voltar ao setor
    </button>
  );
}
function MissionTitle({ sector, mission }: { sector: Sector; mission: Mission }) {
  return (
    <div>
      <p className="eyebrow">
        SETOR {sector.number} · {sector.name.toUpperCase()}
      </p>
      <h1>{mission.title}</h1>
    </div>
  );
}
function MissionCounter({ number, total }: { number: number; total: number }) {
  return (
    <span className="mission-counter">
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
    <div className="mission-heading">
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
        className="mission-progress"
        value={number - Number(!done)}
        max={items.length}
        aria-label="Progresso no setor"
      />
    </>
  );
}
