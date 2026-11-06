import { expect, it } from 'vitest';
import { missions } from '../content/missions';
import { ChallengeKind, Operation, type Mission } from './types';
import { validateAuthoredMission, creationExpression } from './question-authoring';

function numeric(): Mission {
  return {
    ...missions[0],
    kind: ChallengeKind.Number,
    correctChoice: undefined,
    choices: undefined,
    expression: { type: 'constant', value: 5 },
  };
}

it('validates numeric questions independently and rejects negative and fractional answers', () => {
  expect(validateAuthoredMission(numeric()).expression).toEqual({ type: 'constant', value: 5 });
  for (const value of [-1, 0.5, Infinity])
    expect(() =>
      validateAuthoredMission({ ...numeric(), expression: { type: 'constant', value } }),
    ).toThrow();
});

it('requires distinct choices and exactly one correct option', () => {
  expect(validateAuthoredMission(missions[0])).toEqual(missions[0]);
  expect(() => validateAuthoredMission({ ...missions[0], correctChoice: undefined })).toThrow();
  expect(() =>
    validateAuthoredMission({
      ...missions[0],
      choices: [missions[0].choices![0], missions[0].choices![0]],
    }),
  ).toThrow();
});

it('supports equivalent build orders and rejects nonequivalent orders and missing pieces', () => {
  const mission = {
    ...numeric(),
    kind: ChallengeKind.Build,
    expression: {
      type: 'operation' as const,
      operation: Operation.Add,
      left: { type: 'variable' as const },
      right: { type: 'constant' as const, value: 2 },
    },
    tokens: ['x', '+', '2'],
    expectedTokens: ['x', '+', '2'],
    equivalentTokens: [['2', '+', 'x']],
  };

  expect(validateAuthoredMission(mission)).toEqual(mission);
  expect(() =>
    validateAuthoredMission({ ...mission, equivalentTokens: [['x', '-', '2']] }),
  ).toThrow();
  expect(() =>
    validateAuthoredMission({
      ...mission,
      tokens: ['x', '-', '2'],
      expectedTokens: ['x', '-', '2'],
      equivalentTokens: [],
    }),
  ).toThrow();
});

it('keeps guided creation restricted to the existing expression and values', () => {
  const mission = {
    ...numeric(),
    kind: ChallengeKind.Create,
    variable: 3,
    expression: creationExpression(),
  };

  expect(validateAuthoredMission(mission)).toEqual(mission);
  expect(() => validateAuthoredMission({ ...mission, variable: 5 })).toThrow();
  expect(() => validateAuthoredMission({ ...mission, expression: numeric().expression })).toThrow();
});
