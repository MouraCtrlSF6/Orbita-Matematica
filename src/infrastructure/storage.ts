import { missionById, missions } from '../content/missions';
import { initialSave } from '../game/progress';
import type { MissionResult, SavedGame } from '../game/types';

export const STORAGE_KEY = 'orbita-matematica:v1';
export interface StoragePort {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isResult(value: unknown): value is MissionResult {
  if (!isRecord(value)) return false;
  const validCreation =
    value.creation === undefined ||
    (isRecord(value.creation) &&
      (value.creation.context === 'cristais' || value.creation.context === 'peças') &&
      typeof value.creation.variable === 'number' &&
      [2, 3, 4].includes(value.creation.variable));
  return (
    Number.isInteger(value.hints) &&
    Number(value.hints) >= 0 &&
    Number(value.hints) <= 3 &&
    typeof value.visual === 'boolean' &&
    typeof value.guided === 'boolean' &&
    Number.isInteger(value.attempts) &&
    Number(value.attempts) >= 0 &&
    validCreation
  );
}

export function parseSave(raw: string | null): SavedGame {
  if (!raw) return initialSave();
  try {
    const data: unknown = JSON.parse(raw);
    if (
      !isRecord(data) ||
      data.version !== 1 ||
      !isRecord(data.completed) ||
      !isRecord(data.preferences) ||
      typeof data.tutorialDone !== 'boolean' ||
      typeof data.preferences.largeText !== 'boolean' ||
      typeof data.preferences.reducedMotion !== 'boolean'
    )
      return initialSave();
    const completed: SavedGame['completed'] = {};
    for (const mission of missions) {
      const result = data.completed[mission.id];
      if (!isResult(result)) continue;
      completed[mission.id] = result;
    }
    return {
      version: 1,
      completed,
      tutorialDone: data.tutorialDone,
      lastMissionId:
        typeof data.lastMissionId === 'string' && missionById.has(data.lastMissionId)
          ? data.lastMissionId
          : null,
      preferences: {
        largeText: data.preferences.largeText,
        reducedMotion: data.preferences.reducedMotion,
        soundEnabled:
          typeof data.preferences.soundEnabled === 'boolean' ? data.preferences.soundEnabled : true,
      },
    };
  } catch {
    return initialSave();
  }
}

export function loadGame(storage: StoragePort): SavedGame {
  try {
    return parseSave(storage.getItem(STORAGE_KEY));
  } catch {
    return initialSave();
  }
}

export function saveGame(storage: StoragePort, save: SavedGame): boolean {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(save));
    return true;
  } catch {
    return false;
  }
}
