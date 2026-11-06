import { expect, it } from 'vitest';
import { missions } from '../content/missions';
import { evaluate, isCorrect } from './math';
import { ChallengeKind, type Mission } from './types';
import { validateAuthoredMission } from './question-authoring';
import { defaultRoomCatalog, parseRoomCatalog, storeRoomCatalog } from './room-catalog';
import { parseExpressionTokens } from './token-expression';

function written(): Mission {
  return {
    ...missions[0],
    expression: undefined,
    visual: undefined,
    choices: undefined,
    correctChoice: undefined,
    id: 'custom-12345678-1234-1234-1234-123456789abc',
    kind: ChallengeKind.Text,
    formula: '',
    hints: [],
    objective: '',
    skill: '',
    expectedAnswer: '2x',
  };
}

it('corrects text without changing legacy number correction', () => {
  expect(isCorrect(written(), '  2X  ')).toBe(true);
  expect(isCorrect(written(), 'x+x')).toBe(false);
  expect(isCorrect({ ...written(), expectedAnswer: 'dois cristais' }, ' DOIS   cristais ')).toBe(
    true,
  );
  const numeric = {
    ...missions[0],
    kind: ChallengeKind.Number,
    correctChoice: undefined,
    expression: { type: 'constant' as const, value: 6 },
  };

  expect(isCorrect(numeric, '6')).toBe(true);
  expect(isCorrect(numeric, 'seis')).toBe(false);
});

it('round trips optional fields through a room catalog without changing the default', () => {
  const catalog = { revision: 1, missions: [validateAuthoredMission(written())] };

  expect(parseRoomCatalog(storeRoomCatalog(catalog))).toEqual(catalog);
  expect(defaultRoomCatalog().missions).toHaveLength(52);
  expect(() => validateAuthoredMission({ ...written(), expectedAnswer: ' ' })).toThrow();
});

it('allows unused pieces while rejecting overuse and nonequivalent orders', () => {
  const build = {
    ...written(),
    kind: ChallengeKind.Build,
    expectedAnswer: undefined,
    expression: parseExpressionTokens(['2', '×', 'x', '+', '4']),
    tokens: ['2', '×', 'x', '+', '4', '7'],
    expectedTokens: ['2', '×', 'x', '+', '4'],
    equivalentTokens: [['4', '+', '2', '×', 'x']],
  };

  expect(validateAuthoredMission(build)).toEqual(build);
  expect(() =>
    validateAuthoredMission({ ...build, equivalentTokens: [['x', '+', 'x']] }),
  ).toThrow();
  expect(() =>
    validateAuthoredMission({ ...build, equivalentTokens: [['7', '+', '2']] }),
  ).toThrow();
});

it('parses precedence and parentheses and rejects invalid or undefined expressions', () => {
  expect(evaluate(parseExpressionTokens(['2', '+', '3', '×', '4']), 0)).toBe(14);
  expect(evaluate(parseExpressionTokens(['(', '2', '+', '3', ')', '×', '4']), 0)).toBe(20);
  expect(evaluate(parseExpressionTokens(['2', '×', 'x', '+', '4']), 3)).toBe(10);
  for (const tokens of [
    ['2', '+'],
    ['(', '2'],
    ['2', '2'],
    ['2', '÷', '0'],
    ['1', '÷', '(', '1', '÷', '0', ')'],
    ['x', '+', 'alert(1)'],
  ]) {
    expect(() => parseExpressionTokens(tokens)).toThrow();
  }
});
