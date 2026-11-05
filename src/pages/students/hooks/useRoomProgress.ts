import { useEffect } from 'react';
import { Screen, type GameState } from '../../../game/reducer';
import type { StudentRoom } from '../room-sync';

export function useRoomProgress(room: StudentRoom, state: GameState) {
  const { screen, sectorId, missionId } = state;

  useEffect(() => {
    if (screen === Screen.Map) room.visitSector(null);
    if (screen === Screen.Sector || screen === Screen.Mission) room.visitSector(sectorId);
    if (sectorId && missionId) room.openMission(sectorId, missionId);
  }, [room, screen, sectorId, missionId]);
}
