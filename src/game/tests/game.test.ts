import { describe, expect, it } from 'vitest';
import { missions } from '../../content/missions';
import { mission } from '../../test/mission';
import { add, constant, evaluate, isCorrect, multiply, variable } from '../math';
import { ChallengeKind, Operation } from '../types';

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
    expect(isCorrect(mission('launch-4'), '3 × 🍎')).toBe(true);
    expect(isCorrect(mission('launch-4'), '🍎 × 3')).toBe(true);
    expect(isCorrect(mission('base-4'), '4 + x × 2')).toBe(true);
    expect(isCorrect(mission('launch-4'), '3 + 🍎')).toBe(false);
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
