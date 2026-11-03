import { describe, expect, it } from 'vitest';
import { missions } from '../content/missions';
import { mission } from '../test/mission';
import { add, constant, evaluate, isCorrect, multiply, variable } from './math';
import { initialSave, isMissionUnlocked, isSectorUnlocked, nextMission } from './progress';
import { gameReducer, Screen, type GameState } from './reducer';
import { ChallengeKind, Operation, type MissionResult } from './types';

const result: MissionResult = { hints: 0, visual: false, attempts: 1, guided: false };
const initial = (): GameState => ({
  save: initialSave(),
  screen: Screen.Map,
  missionId: null,
  sectorId: null,
});

describe('mathematical rules', () => {
  it('evaluates subtraction and division without changing operation order', () => {
    expect(
      evaluate(
        {
          type: 'operation',
          operation: Operation.Subtract,
          left: constant(7),
          right: multiply(constant(2), variable),
        },
        -4,
      ),
    ).toBe(15);
    expect(
      evaluate(
        {
          type: 'operation',
          operation: Operation.Divide,
          left: add(variable, constant(2)),
          right: constant(3),
        },
        13,
      ),
    ).toBe(5);
    expect(() =>
      evaluate(
        { type: 'operation', operation: Operation.Divide, left: constant(1), right: constant(0) },
        0,
      ),
    ).toThrow(RangeError);
  });
  it('substitutes variables, respecting the expression tree and parentheses', () => {
    expect(evaluate(add(multiply(constant(2), variable), constant(3)), 3)).toBe(9);
    expect(evaluate(multiply(constant(2), add(variable, constant(2))), 3)).toBe(10);
    expect(evaluate(variable, 0)).toBe(0);
  });
  it('validates the numeric answers of every mission independently', () => {
    const expected = {
      'launch-1': 6,
      'launch-2': 9,
      'launch-3': 6,
      'launch-4': 6,
      'launch-5': 12,
      'workshop-1': 7,
      'workshop-2': 8,
      'workshop-3': 9,
      'workshop-4': 10,
      'workshop-5': 14,
      'base-1': 7,
      'base-2': 10,
      'base-3': 12,
      'base-4': 10,
      'base-5': 10,
    };
    Object.entries(expected).forEach(([id, answer]) => {
      const problem = mission(id);
      expect(evaluate(problem.expression, problem.variable)).toBe(answer);
    });
  });
  it('does not accept empty, partial, negative, exponential or executable numeric answers', () => {
    const problem = mission('launch-2');
    for (const answer of ['', ' ', '9x', '-9', '9e0', '3+6', 'alert(9)'])
      expect(isCorrect(problem, answer)).toBe(false);
    expect(isCorrect(problem, '9')).toBe(true);
  });
  it('checks choice and assembly answers without evaluating input code', () => {
    expect(isCorrect(mission('launch-3'), 'robots')).toBe(true);
    expect(isCorrect(mission('launch-3'), 'batteries')).toBe(false);
    expect(isCorrect(mission('launch-4'), '3 × x')).toBe(true);
    expect(isCorrect(mission('launch-4'), 'x × 3')).toBe(true);
    expect(isCorrect(mission('base-4'), '4 + x × 2')).toBe(true);
    expect(isCorrect(mission('launch-4'), '3 + x')).toBe(false);
  });
  it('checks all creation values and distributivity with different variable values', () => {
    for (const value of [2, 3, 4]) {
      expect(isCorrect(mission('base-5'), String(2 * value + 4), value)).toBe(true);
      expect(evaluate(mission('base-2').expression, value)).toBe(
        evaluate(mission('base-3').expression, value),
      );
    }
  });
});

describe('mission content', () => {
  it('has three sectors of catalog missions, with valid short prompts and hints', () => {
    expect(missions).toHaveLength(52);
    expect(new Set(missions.map((mission) => mission.id)).size).toBe(52);
    for (const [sector, count] of Object.entries({ launch: 22, workshop: 15, base: 15 }))
      expect(missions.filter((mission) => mission.sectorId === sector)).toHaveLength(count);
    for (const mission of missions) {
      expect(mission.prompt.length).toBeLessThan(220);
      expect(mission.hints).toHaveLength(3);
      expect(mission.hints.every(Boolean)).toBe(true);
      if (mission.kind === ChallengeKind.Choice) {
        const correct = mission.choices?.filter((choice) => isCorrect(mission, choice.value));
        expect(correct).toHaveLength(1);
      }
    }
    expect(mission('base-5').kind).toBe(ChallengeKind.Create);
  });
});

describe('progression', () => {
  it('toggles the sound preference without changing progress', () => {
    const state = initial();
    const muted = gameReducer(state, { type: 'toggle-sound' });
    expect(muted.save.preferences.soundEnabled).toBe(false);
    expect(muted.save.completed).toBe(state.save.completed);
    expect(gameReducer(muted, { type: 'toggle-sound' })).toEqual(state);
  });
  it('gates sectors and returns to the visited sector without starting another mission', () => {
    expect(gameReducer(initial(), { type: 'enter-sector', id: 'launch' })).toEqual(initial());
    let state = gameReducer(initial(), { type: 'tutorial-done' });
    expect(gameReducer(state, { type: 'enter-sector', id: 'workshop' })).toBe(state);
    expect(gameReducer(state, { type: 'enter-sector', id: 'missing' })).toBe(state);
    state = gameReducer(state, { type: 'enter-sector', id: 'launch' });
    expect(state.screen).toBe(Screen.Sector);
    expect(state.sectorId).toBe('launch');
    state = gameReducer(state, { type: 'start', id: missions[0].id });
    const saved = state.save;
    state = gameReducer(state, { type: 'return-sector' });
    expect(state).toMatchObject({
      screen: Screen.Sector,
      sectorId: 'launch',
      missionId: null,
      save: saved,
    });
    state = gameReducer(state, { type: 'start', id: missions[0].id });
    state = gameReducer(state, { type: 'complete', result });
    state = gameReducer(state, { type: 'return-sector' });
    expect(state.screen).toBe(Screen.Sector);
    expect(state.missionId).toBeNull();
    expect(isMissionUnlocked(missions[1].id, state.save.completed)).toBe(true);
  });
  it('prevents opening locked missions or sectors', () => {
    const state = initial();
    expect(gameReducer(state, { type: 'start', id: 'base-1' })).toBe(state);
    expect(gameReducer(state, { type: 'start', id: 'unknown' })).toBe(state);
    expect(isMissionUnlocked('launch-2', {})).toBe(false);
    expect(isSectorUnlocked('workshop', {})).toBe(false);
    expect(isSectorUnlocked('missing', {})).toBe(false);
  });
  it('completes the entire journey including assisted missions and replay', () => {
    let state = initial();
    missions.forEach((mission) => {
      state = gameReducer(state, { type: 'start', id: mission.id });
      expect(state.missionId).toBe(mission.id);
      state = gameReducer(state, {
        type: 'complete',
        result: { ...result, hints: 3, guided: true },
      });
    });
    expect(Object.keys(state.save.completed)).toHaveLength(52);
    expect(isSectorUnlocked('base', state.save.completed)).toBe(true);
    state = gameReducer(state, { type: 'start', id: 'launch-1' });
    state = gameReducer(state, { type: 'complete', result });
    expect(Object.keys(state.save.completed)).toHaveLength(52);
    expect(state.save.completed['launch-1'].guided).toBe(false);
  });
  it('remembers the current unfinished mission, preferences and tutorial, then resets', () => {
    let state = gameReducer(initial(), { type: 'tutorial-done' });
    state = gameReducer(state, { type: 'preference', key: 'largeText', value: true });
    state = gameReducer(state, { type: 'start', id: missions[0].id });
    expect(state.save.tutorialDone).toBe(true);
    expect(state.save.preferences.largeText).toBe(true);
    expect(nextMission(state.save)).toBe(missions[0].id);
    expect(gameReducer(state, { type: 'reset' })).toEqual(initial());
  });
});
