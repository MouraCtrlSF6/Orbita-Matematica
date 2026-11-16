import { describe, expect, it } from 'vitest';
import { missions } from '../../../../content/missions';
import {
  initialSave,
  isMissionUnlocked,
  isSectorUnlocked,
  nextMission,
} from '../../../../game/progress';
import type { MissionResult } from '../../../../game/types';
import { parseSave } from '../../../../infrastructure/storage';
import { gameReducer } from '../reducer';
import { GameActionType, Screen, type GameState } from '../reducer-types';

const result: MissionResult = { hints: 0, visual: false, attempts: 1, guided: false };
const initial = (): GameState => ({
  save: initialSave(),
  screen: Screen.Map,
  missionId: null,
  sectorId: null,
});

describe('progression', () => {
  it('toggles the sound preference without changing progress', () => {
    const state = initial();
    const muted = gameReducer(state, { type: GameActionType.ToggleSound });
    expect(muted.save.preferences.soundEnabled).toBe(false);
    expect(muted.save.completed).toBe(state.save.completed);
    expect(gameReducer(muted, { type: GameActionType.ToggleSound })).toEqual(state);
  });
  it('gates sectors and returns to the visited sector without starting another mission', () => {
    let state = initial();
    expect(gameReducer(state, { type: GameActionType.EnterSector, id: 'workshop' })).toBe(state);
    expect(gameReducer(state, { type: GameActionType.EnterSector, id: 'missing' })).toBe(state);
    state = gameReducer(state, { type: GameActionType.EnterSector, id: 'launch' });
    expect(state.screen).toBe(Screen.Sector);
    expect(state.sectorId).toBe('launch');
    state = gameReducer(state, { type: GameActionType.Start, id: missions[0].id });
    const saved = state.save;
    state = gameReducer(state, { type: GameActionType.ReturnSector });
    expect(state).toMatchObject({
      screen: Screen.Sector,
      sectorId: 'launch',
      missionId: null,
      save: saved,
    });
    state = gameReducer(state, { type: GameActionType.Start, id: missions[0].id });
    state = gameReducer(state, { type: GameActionType.Complete, result });
    state = gameReducer(state, { type: GameActionType.ReturnSector });
    expect(state.screen).toBe(Screen.Sector);
    expect(state.missionId).toBeNull();
    expect(isMissionUnlocked(missions[1].id, state.save.completed)).toBe(true);
  });
  it('prevents opening locked missions or sectors', () => {
    const state = initial();
    expect(gameReducer(state, { type: GameActionType.Start, id: 'base-1' })).toBe(state);
    expect(gameReducer(state, { type: GameActionType.Start, id: 'unknown' })).toBe(state);
    expect(isMissionUnlocked('launch-2', {})).toBe(false);
    expect(isSectorUnlocked('workshop', {})).toBe(false);
    expect(isSectorUnlocked('missing', {})).toBe(false);
  });
  it('completes the entire journey including assisted missions and replay', () => {
    let state = initial();
    missions.forEach((mission) => {
      state = gameReducer(state, { type: GameActionType.Start, id: mission.id });
      expect(state.missionId).toBe(mission.id);
      state = gameReducer(state, {
        type: GameActionType.Complete,
        result: { ...result, hints: 3, guided: true },
      });
    });
    expect(Object.keys(state.save.completed)).toHaveLength(52);
    expect(isSectorUnlocked('base', state.save.completed)).toBe(true);
    state = gameReducer(state, { type: GameActionType.Start, id: 'launch-1' });
    state = gameReducer(state, { type: GameActionType.Complete, result });
    expect(Object.keys(state.save.completed)).toHaveLength(52);
    expect(state.save.completed['launch-1'].guided).toBe(false);
  });
  it('remembers the current unfinished mission and preferences, then resets', () => {
    let state = initial();
    state = gameReducer(state, { type: GameActionType.Preference, key: 'largeText', value: true });
    state = gameReducer(state, { type: GameActionType.Start, id: missions[0].id });
    expect(state.save.preferences.largeText).toBe(true);
    expect(nextMission(state.save)).toBe(missions[0].id);
    expect(gameReducer(state, { type: GameActionType.Reset })).toEqual(initial());
  });
});

it('uses the supplied catalog for unlocking and preserves custom completions', () => {
  const mission = { ...missions[0], id: 'custom-11111111-1111-4111-8111-111111111111' };
  const state: GameState = {
    save: { ...initialSave(), tutorialDone: true },
    screen: Screen.Map,
    missionId: null,
    sectorId: null,
  };
  const started = gameReducer(state, { type: GameActionType.Start, id: mission.id }, [mission]);
  const result = { hints: 0, visual: false, attempts: 1, guided: false };
  const completed = gameReducer(started, { type: GameActionType.Complete, result }, [mission]);

  expect(started.missionId).toBe(mission.id);
  expect(completed.save.completed[mission.id]).toEqual(result);
  expect(parseSave(JSON.stringify(completed.save), [mission]).completed[mission.id]).toEqual(
    result,
  );
  expect(parseSave(JSON.stringify(completed.save), []).completed[mission.id]).toEqual(result);
  expect(gameReducer(state, { type: GameActionType.Start, id: missions[1].id }, [mission])).toEqual(
    state,
  );
});
