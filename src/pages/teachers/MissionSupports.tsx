import type { RoomMission } from '../../game/room-progress';

export interface MissionSupportsProps {
  mission: RoomMission;
}

export function MissionSupports({ mission }: MissionSupportsProps) {
  return (
    <p>
      Dicas usadas {mission.usedHints ? 'sim' : 'não'} · Modelo visual usado{' '}
      {mission.usedVisuals ? 'sim' : 'não'}
    </p>
  );
}
