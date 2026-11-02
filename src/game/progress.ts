import { missions } from '../content/missions';
import { sectors } from '../content/sectors';
import type { SavedGame } from './types';

export const initialSave = (): SavedGame => ({
  version: 1,
  completed: {},
  tutorialDone: false,
  lastMissionId: null,
  preferences: { largeText: false, reducedMotion: false },
});

export function isSectorUnlocked(sectorId: string, completed: SavedGame['completed']): boolean {
  const index = sectors.findIndex((sector) => sector.id === sectorId);
  if (index < 0) return false;
  const firstMission = missions.find((mission) => mission.sectorId === sectorId);
  return firstMission !== undefined && isMissionUnlocked(firstMission.id, completed);
}

export function isMissionUnlocked(id: string, completed: SavedGame['completed']): boolean {
  const index = missions.findIndex((mission) => mission.id === id);
  return (
    index >= 0 && missions.slice(0, index).every((mission) => completed[mission.id] !== undefined)
  );
}

export function nextMission(save: SavedGame): string {
  if (
    save.lastMissionId &&
    isMissionUnlocked(save.lastMissionId, save.completed) &&
    !save.completed[save.lastMissionId]
  )
    return save.lastMissionId;
  return missions.find((mission) => !save.completed[mission.id])?.id ?? missions[0].id;
}
