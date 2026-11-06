import { SupportUsage } from './SupportUsage/SupportUsage';
import type { RoomMission } from '../../../../../../../../../../../../../game/room-progress';

export interface MissionSupportsProps {
  mission: RoomMission;
}

export function MissionSupports({ mission }: MissionSupportsProps) {
  return (
    <div className="my-3 flex flex-wrap gap-2 text-small">
      <span className="rounded-control border border-amber-600 bg-transparent px-3 py-1 text-black">
        Dicas usadas: <SupportUsage used={mission.usedHints} />
      </span>
      <span className="rounded-control border border-selected-border bg-selected px-3 py-1 text-primary-hover">
        Modelo visual usado: <SupportUsage used={mission.usedVisuals} />
      </span>
    </div>
  );
}
