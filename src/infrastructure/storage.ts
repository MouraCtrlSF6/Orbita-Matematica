import { missionById, missions } from '../content/missions';
import { initialSave } from '../game/progress';
import type { Mission, MissionResult, SavedGame } from '../game/types';
import { isRecord, matchesFields, optional } from '../game/validation';

export const STORAGE_KEY = 'orbita-matematica:v1';
export interface StoragePort {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

function isBoolean(value: unknown): boolean {
  return typeof value === 'boolean';
}
function isIntegerBetween(value: unknown, min: number, max: number): boolean {
  return Number.isInteger(value) && Number(value) >= min && Number(value) <= max;
}
function isCreation(value: unknown): boolean {
  return (
    isRecord(value) &&
    matchesFields(value, {
      context: (context) => ['cristais', 'peças'].includes(context as string),
      variable: (variable) => [2, 3, 4].includes(variable as number),
    })
  );
}
function isResult(value: unknown): value is MissionResult {
  return (
    isRecord(value) &&
    matchesFields(value, {
      hints: (hints) => isIntegerBetween(hints, 0, 3),
      visual: isBoolean,
      guided: isBoolean,
      attempts: (attempts) => isIntegerBetween(attempts, 0, Infinity),
      creation: optional(isCreation),
    })
  );
}
interface SavedData {
  completed: Record<string, unknown>;
  tutorialDone: boolean;
  lastMissionId: unknown;
  preferences: { largeText: boolean; reducedMotion: boolean; soundEnabled: unknown };
}
function isPreferences(value: unknown): boolean {
  return (
    isRecord(value) && matchesFields(value, { largeText: isBoolean, reducedMotion: isBoolean })
  );
}
function isSavedData(value: unknown): value is SavedData {
  return (
    isRecord(value) &&
    matchesFields(value, {
      version: (version) => version === 1,
      completed: isRecord,
      preferences: isPreferences,
      tutorialDone: isBoolean,
    })
  );
}
function validMissionId(value: unknown, catalog: Mission[]): string | null {
  return typeof value === 'string' && catalog.some((mission) => mission.id === value)
    ? value
    : null;
}
function resultEntry(id: string, completed: Record<string, unknown>): [string, MissionResult][] {
  const result = completed[id];
  return isResult(result) ? [[id, result]] : [];
}
function validResults(completed: Record<string, unknown>): SavedGame['completed'] {
  return Object.fromEntries(
    Object.keys(completed)
      .filter(isKnownMission)
      .flatMap((id) => resultEntry(id, completed)),
  );
}
function isKnownMission(id: string) {
  return missionById.has(id) || /^custom-[a-f0-9-]{36}$/.test(id);
}

function restoreSave(data: unknown, catalog: Mission[]): SavedGame {
  if (!isSavedData(data)) return initialSave();
  return {
    version: 1,
    completed: validResults(data.completed),
    tutorialDone: data.tutorialDone,
    lastMissionId: validMissionId(data.lastMissionId, catalog),
    preferences: {
      largeText: data.preferences.largeText,
      reducedMotion: data.preferences.reducedMotion,
      soundEnabled:
        typeof data.preferences.soundEnabled === 'boolean' ? data.preferences.soundEnabled : true,
    },
  };
}
export function parseSave(raw: string | null, catalog: Mission[] = missions): SavedGame {
  if (!raw) return initialSave();
  try {
    return restoreSave(JSON.parse(raw), catalog);
  } catch {
    return initialSave();
  }
}

export function loadGame(
  storage: StoragePort,
  key = STORAGE_KEY,
  catalog: Mission[] = missions,
): SavedGame {
  try {
    return parseSave(storage.getItem(key), catalog);
  } catch {
    return initialSave();
  }
}

export function saveGame(storage: StoragePort, save: SavedGame, key = STORAGE_KEY): boolean {
  try {
    storage.setItem(key, JSON.stringify(save));
    return true;
  } catch {
    return false;
  }
}
