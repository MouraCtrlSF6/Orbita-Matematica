import { describe, expect, it } from 'vitest';
import { initialSave, isMissionUnlocked, isSectorUnlocked, nextMission } from '../game/progress';
import { missions } from '../content/missions';
import { loadGame, parseSave, saveGame, STORAGE_KEY, type StoragePort } from './storage';

describe('local persistence', () => {
  it.each([false, true])('preserves legacy saves with tutorialDone set to %s', (tutorialDone) => {
    const data = initialSave();

    data.tutorialDone = tutorialDone;
    data.completed[missions[0].id] = { hints: 1, visual: true, attempts: 2, guided: false };
    data.lastMissionId = missions[1].id;
    data.preferences.largeText = true;

    expect(parseSave(JSON.stringify(data))).toEqual(data);
  });
  it('loads saves from before sound preferences and preserves a saved mute setting', () => {
    const data = initialSave();
    data.completed['launch-1'] = { hints: 1, visual: true, attempts: 2, guided: false };
    const legacy = { ...data, preferences: { largeText: true, reducedMotion: false } };
    expect(parseSave(JSON.stringify(legacy))).toEqual({
      ...data,
      preferences: { ...legacy.preferences, soundEnabled: true },
    });
    data.preferences.soundEnabled = false;
    expect(parseSave(JSON.stringify(data))).toEqual(data);
  });
  it('preserves the authored context and variable after the complete journey', () => {
    const data = initialSave();
    missions.forEach((mission) => {
      data.completed[mission.id] = { hints: 0, visual: false, attempts: 1, guided: false };
    });
    data.completed['base-5'].creation = { context: 'peças', variable: 4 };
    expect(parseSave(JSON.stringify(data))).toEqual(data);
  });
  it('restores versioned progress, preferences and authored problems', () => {
    const data = initialSave();
    data.completed['launch-1'] = { hints: 2, visual: true, attempts: 2, guided: false };
    data.lastMissionId = 'launch-2';
    data.preferences.largeText = true;
    expect(parseSave(JSON.stringify(data))).toEqual(data);
  });
  it('recovers safely from corrupt, unknown-version and incorrectly typed data', () => {
    for (const raw of [
      'oops',
      'null',
      '[]',
      '{"version":2}',
      '{}',
      JSON.stringify({ ...initialSave(), preferences: null }),
    ]) {
      expect(parseSave(raw)).toEqual(initialSave());
    }
    const data = initialSave();
    expect(
      parseSave(
        JSON.stringify({ ...data, completed: { 'launch-1': { hints: 99, attempts: -2 } } }),
      ),
    ).toEqual(data);
  });
  it('keeps valid conclusions when the catalog gains earlier missions and discards unknown IDs', () => {
    const data = initialSave();
    for (const mission of missions.filter((mission) => !mission.id.startsWith('equations-'))) {
      data.completed[mission.id] = { hints: 1, visual: true, attempts: 1, guided: false };
    }
    data.completed['removed-mission'] = { hints: 0, visual: false, attempts: 1, guided: false };
    data.lastMissionId = 'workshop-2';
    const restored = parseSave(JSON.stringify(data));
    expect(Object.keys(restored.completed)).toHaveLength(15);
    expect(restored.completed['base-5']).toEqual(data.completed['base-5']);
    expect(restored.completed['removed-mission']).toBeUndefined();
    expect(nextMission(restored)).toBe('equations-01');
    expect(isMissionUnlocked('workshop-2', restored.completed)).toBe(false);
    expect(isSectorUnlocked('workshop', restored.completed)).toBe(false);
    expect(isSectorUnlocked('base', restored.completed)).toBe(false);
    expect(
      parseSave(JSON.stringify({ ...initialSave(), lastMissionId: 'invalid' })).lastMissionId,
    ).toBeNull();
  });
  it('continues when access to storage is denied or its quota is exhausted', () => {
    const storage: StoragePort = {
      getItem: () => {
        throw Error('denied');
      },
      setItem: () => {
        throw Error('quota');
      },
    };
    expect(loadGame(storage)).toEqual(initialSave());
    expect(saveGame(storage, initialSave())).toBe(false);
  });
  it('writes only the versioned game state', () => {
    const values = new Map<string, string>();
    const storage: StoragePort = {
      getItem: (key) => values.get(key) ?? null,
      setItem: (key, value) => {
        values.set(key, value);
      },
    };
    expect(saveGame(storage, initialSave())).toBe(true);
    expect(values.has(STORAGE_KEY)).toBe(true);
    expect(loadGame(storage)).toEqual(initialSave());
  });
});
