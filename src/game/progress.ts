import { missions } from '../content/missions';
import { sectors } from '../content/sectors';
import type { Mission, SavedGame } from './types';

export const initialSave = (): SavedGame => ({
  version: 1,
  completed: {},
  tutorialDone: false,
  lastMissionId: null,
  preferences: { largeText: false, reducedMotion: false, soundEnabled: true },
});

export function isSectorUnlocked(
  sectorId: string,
  completed: SavedGame['completed'],
  catalog: Mission[] = missions,
): boolean {
  const index = sectorIndex(sectorId);
  if (index < 0) return false;
  const previous = new Set(sectors.slice(0, index).map((sector) => sector.id));
  return previousMissionsComplete(catalog, previous, completed);
}

export function isMissionUnlocked(
  id: string,
  completed: SavedGame['completed'],
  catalog: Mission[] = missions,
): boolean {
  const index = catalog.findIndex((mission) => mission.id === id);
  return (
    index >= 0 && catalog.slice(0, index).every((mission) => completed[mission.id] !== undefined)
  );
}

export function nextMission(save: SavedGame, catalog: Mission[] = missions): string {
  if (
    save.lastMissionId &&
    isMissionUnlocked(save.lastMissionId, save.completed, catalog) &&
    !save.completed[save.lastMissionId]
  )
    return save.lastMissionId;
  return catalog.find((mission) => !save.completed[mission.id])?.id ?? catalog[0]?.id ?? '';
}

function sectorIndex(id: string) {
  return sectors.findIndex((sector) => sector.id === id);
}

function previousMissionsComplete(
  catalog: Mission[],
  previous: Set<string>,
  completed: SavedGame['completed'],
) {
  return catalog
    .filter((mission) => previous.has(mission.sectorId))
    .every((mission) => completed[mission.id] !== undefined);
}
