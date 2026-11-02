import { describe, expect, it } from 'vitest';
import { evaluate, isCorrect } from '../game/math';
import { ChallengeKind, Operation, type Expression, type Mission } from '../game/types';
import { missions, missionById } from './missions';
import { parseMissionCatalog } from './mission-catalog';
import catalog from './problems.json';
import { sectors } from './sectors';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function assertExpression(value: unknown): asserts value is Expression {
  if (!isRecord(value)) throw new Error('Expressão ausente');
  if (value.type === 'constant') {
    expect(typeof value.value).toBe('number');
    expect(Number.isFinite(value.value)).toBe(true);
  } else if (value.type === 'operation') {
    expect(Object.values(Operation)).toContain(value.operation);
    assertExpression(value.left);
    assertExpression(value.right);
  } else {
    expect(value.type).toBe('variable');
  }
}

function assertMission(value: unknown): asserts value is Mission {
  if (!isRecord(value)) throw new Error('Problema inválido');
  const allowed = [
    'id',
    'sectorId',
    'title',
    'objective',
    'skill',
    'prompt',
    'kind',
    'expression',
    'variable',
    'formula',
    'choices',
    'correctChoice',
    'tokens',
    'expectedTokens',
    'equivalentTokens',
    'hints',
    'explanation',
    'visual',
  ];
  expect(Object.keys(value).every((key) => allowed.includes(key))).toBe(true);
  for (const key of [
    'id',
    'sectorId',
    'title',
    'objective',
    'skill',
    'prompt',
    'formula',
    'explanation',
  ]) {
    expect(typeof value[key]).toBe('string');
    expect(value[key]).not.toBe('');
  }
  expect(Object.values(ChallengeKind)).toContain(value.kind);
  expect(typeof value.variable).toBe('number');
  expect(Number.isFinite(value.variable)).toBe(true);
  assertExpression(value.expression);
  if (!Array.isArray(value.hints)) throw new Error('Pistas ausentes');
  expect(value.hints).toHaveLength(3);
  expect(value.hints.every((hint) => typeof hint === 'string' && hint.length > 0)).toBe(true);
  if (!isRecord(value.visual)) throw new Error('Modelo visual ausente');
  for (const key of ['groups', 'perGroup', 'extra']) {
    expect(Number.isInteger(value.visual[key])).toBe(true);
    expect(value.visual[key]).toBeGreaterThanOrEqual(0);
  }
  expect(typeof value.visual.label).toBe('string');
  if (value.kind === ChallengeKind.Choice) {
    if (!Array.isArray(value.choices)) throw new Error('Alternativas ausentes');
    expect(value.choices.length).toBeGreaterThan(1);
    value.choices.forEach((choice: unknown) => {
      if (!isRecord(choice)) throw new Error('Alternativa inválida');
      expect(typeof choice.label).toBe('string');
      expect(typeof choice.value).toBe('string');
    });
  }
  if (value.correctChoice !== undefined) expect(typeof value.correctChoice).toBe('string');
}

type CatalogProblem = (typeof catalog.sections)[number]['problems'][number];
const allProblems = catalog.sections.flatMap<CatalogProblem>((section) => section.problems);
const imported = allProblems.filter((problem) => problem.id.startsWith('equations-'));
const expectedAnswers = [
  5, 10, 5, 8, 8, 15, 6, 5, 6, 14, 10, 4, 5, 10, 5, 14, 4, 7, 15, 5, 18, 0, 5, 7, 6, 12, -4, 4, 5,
  4, 3, -3, 6, 7, 7, 13, 7,
];
const expectedLeftValues = [
  5, 10, 5, 8, 8, 15, 6, 5, 6, 14, 10, 4, 8, 6, 15, 7, 9, 12, 9, 20, 6, 8, 13, 17, 32, 10, 15, 14,
  22, 32, 10, 3, 18, 19, 32, 5, 6,
];

describe('shared problem contract', () => {
  it('keeps all 52 problems compatible with Mission and groups them in the three game sectors', () => {
    expect(catalog.version).toBe(3);
    expect(catalog.sections.map((section) => section.id)).toEqual(
      sectors.map((sector) => sector.id),
    );
    expect(catalog.sections.map((section) => section.problems.length)).toEqual([22, 15, 15]);
    expect(allProblems).toHaveLength(52);
    const ids: string[] = [];
    for (const problem of allProblems) {
      assertMission(problem);
      ids.push(problem.id);
      expect(Number.isFinite(evaluate(problem.expression, problem.variable))).toBe(true);
    }
    expect(new Set(ids).size).toBe(52);
    catalog.sections.forEach((section) =>
      section.problems.forEach((problem) => {
        assertMission(problem);
        expect(problem.sectorId).toBe(section.id);
      }),
    );
  });

  it('exports all catalog problems in their section order and indexes every mission', () => {
    expect(missions).toEqual(allProblems);
    expect(missionById.size).toBe(52);
    missions.forEach((mission) => expect(missionById.get(mission.id)).toBe(mission));
  });

  it('assigns the imported levels by difficulty and uses short narrative prompts', () => {
    imported.forEach((problem, index) => {
      const expectedSector = index < 17 ? 'launch' : index < 27 ? 'workshop' : 'base';
      expect(problem.sectorId).toBe(expectedSector);
      expect(problem.prompt).not.toBe(problem.formula);
      expect(problem.prompt.length).toBeLessThanOrEqual(220);
      expect(problem.prompt).toMatch(/[a-zÀ-ÿ]{3,}/i);
      expect(problem.prompt.match(/\?/g)).toHaveLength(1);
    });
  });

  it('preserves every answer and expression, including zero, negatives, fractions and both sides', () => {
    expect(imported).toHaveLength(37);
    imported.forEach((problem, index) => {
      assertMission(problem);
      const expected = expectedAnswers[index];
      expect(problem.id).toBe(`equations-${String(index + 1).padStart(2, '0')}`);
      expect(problem.kind).toBe(ChallengeKind.Choice);
      expect(problem.correctChoice).toBe(String(expected));
      expect(isCorrect(problem, String(expected))).toBe(true);
      expect(isCorrect(problem, String(expected + 1))).toBe(false);
      expect(evaluate(problem.expression, problem.variable)).toBeCloseTo(expectedLeftValues[index]);
      const correct = problem.choices?.filter((choice) => isCorrect(problem, choice.value));
      expect(correct).toHaveLength(1);
      expect(new Set(problem.choices?.map((choice) => choice.value)).size).toBe(3);
    });
  });
});

describe('catalog validation', () => {
  const sectorIds = sectors.map((sector) => sector.id);

  function withFirstProblem(patch: Record<string, unknown>) {
    return {
      ...catalog,
      sections: catalog.sections.map((section, index) =>
        index === 0
          ? {
              ...section,
              problems: [{ ...section.problems[0], ...patch }, ...section.problems.slice(1)],
            }
          : section,
      ),
    };
  }

  it('rejects invalid versions, empty catalogs and out-of-order sectors', () => {
    for (const invalid of [
      null,
      { ...catalog, version: 0 },
      { ...catalog, sections: [] },
      { ...catalog, sections: [...catalog.sections].reverse() },
    ]) {
      expect(() => parseMissionCatalog(invalid, sectorIds)).toThrow();
    }
  });

  it('rejects malformed mission fields, expressions and mismatched sector IDs', () => {
    const patches = [
      { kind: 'unsupported' },
      { hints: ['apenas uma pista'] },
      { sectorId: 'unknown' },
      { expression: { type: 'constant', value: 'invalid' } },
      {
        expression: {
          type: 'operation',
          operation: 'unsupported',
          left: { type: 'variable' },
          right: { type: 'variable' },
        },
      },
      { visual: { groups: -1, perGroup: 2, extra: 0, label: 'objetos' } },
      { choices: [] },
      { correctChoice: 'not-an-option' },
    ];
    patches.forEach((patch) =>
      expect(() => parseMissionCatalog(withFirstProblem(patch), sectorIds)).toThrow(),
    );
  });

  it('rejects duplicate IDs before constructing the lookup map', () => {
    expect(() => parseMissionCatalog(withFirstProblem({ id: 'launch-1' }), sectorIds)).toThrow(
      /duplicado/,
    );
  });
});
