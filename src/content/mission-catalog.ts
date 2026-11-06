import { ChallengeKind, Operation, type Expression, type Mission } from '../game/types';
import {
  isRecord,
  matchesFields,
  isFiniteNumber,
  isText,
  isTextArray,
  optional,
} from '../game/validation';

function isOperation(value: Record<string, unknown>): boolean {
  return (
    Object.values(Operation).includes(value.operation as Operation) &&
    isExpression(value.left) &&
    isExpression(value.right)
  );
}
function isExpression(value: unknown): value is Expression {
  if (!isRecord(value)) return false;
  if (typeof value.type !== 'string') return false;
  return Object.hasOwn(expressionValidators, value.type) && expressionValidators[value.type](value);
}
const expressionValidators: Record<string, (value: Record<string, unknown>) => boolean> = {
  constant: (value) => isFiniteNumber(value.value),
  variable: () => true,
  operation: isOperation,
};
function isQuantity(value: unknown): boolean {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0;
}
function isVisual(value: unknown): boolean {
  return (
    isRecord(value) &&
    matchesFields(value, {
      label: isText,
      groups: isQuantity,
      perGroup: isQuantity,
      extra: isQuantity,
    })
  );
}
function isHints(value: unknown): boolean {
  return isTextArray(value) && value.length === 3;
}
function isChoice(value: unknown): boolean {
  return isRecord(value) && matchesFields(value, { label: isText, value: isText });
}
function isChoices(value: unknown): boolean {
  return Array.isArray(value) && value.every(isChoice);
}
function isTokenOrders(value: unknown): boolean {
  return Array.isArray(value) && value.every(isTextArray);
}
function hasChoice(choices: unknown, correct: string): boolean {
  return (
    Array.isArray(choices) && choices.some((choice) => isRecord(choice) && choice.value === correct)
  );
}
function hasCorrectChoice(value: Record<string, unknown>): boolean {
  if (value.correctChoice === undefined) return true;
  if (!isText(value.correctChoice)) return false;
  return hasChoice(value.choices, value.correctChoice);
}
function hasChoiceFormat(value: Record<string, unknown>): boolean {
  if (value.kind !== ChallengeKind.Choice) return true;
  return Array.isArray(value.choices) && value.choices.length >= 2;
}
function hasBuildFormat(value: Record<string, unknown>): boolean {
  if (value.kind !== ChallengeKind.Build) return true;
  return hasTokens(value.tokens) && hasTokens(value.expectedTokens);
}
function hasTokens(value: unknown): boolean {
  return isTextArray(value) && value.length > 0;
}
const missionFields = {
  id: isText,
  sectorId: isText,
  title: isText,
  objective: isText,
  skill: isText,
  prompt: isText,
  formula: isText,
  explanation: isText,
  expression: isExpression,
  variable: isFiniteNumber,
  kind: (value: unknown) => Object.values(ChallengeKind).includes(value as ChallengeKind),
  hints: isHints,
  visual: isVisual,
  choices: optional(isChoices),
  tokens: optional(isTextArray),
  expectedTokens: optional(isTextArray),
  equivalentTokens: optional(isTokenOrders),
};
export function isMission(value: unknown): value is Mission {
  return isRecord(value) && matchesFields(value, missionFields) && hasMissionFormat(value);
}
function hasMissionFormat(value: Record<string, unknown>): boolean {
  return hasCorrectChoice(value) && hasChoiceFormat(value) && hasBuildFormat(value);
}
function requireValid(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function catalogSections(value: unknown, count: number): unknown[] {
  requireValid(isRecord(value), 'Catálogo de problemas inválido: versão ou setores incompatíveis.');
  requireValid(
    value.version === 3 && Array.isArray(value.sections),
    'Catálogo de problemas inválido: versão ou setores incompatíveis.',
  );
  requireValid(
    value.sections.length > 0 && value.sections.length === count,
    'Catálogo de problemas inválido: versão ou setores incompatíveis.',
  );
  return value.sections;
}
function sectionProblems(section: unknown, id: string, index: number): unknown[] {
  requireValid(isRecord(section), `Setor inválido na posição ${index + 1} do catálogo.`);
  requireValid(
    section.id === id && Array.isArray(section.problems),
    `Setor inválido na posição ${index + 1} do catálogo.`,
  );
  requireValid(section.problems.length > 0, `Setor inválido na posição ${index + 1} do catálogo.`);
  return section.problems;
}
function parseProblem(problem: unknown, sectorId: string, ids: Set<string>): Mission {
  if (!isMission(problem) || problem.sectorId !== sectorId)
    throw new Error(`Problema inválido no setor ${sectorId}.`);
  if (ids.has(problem.id)) throw new Error(`Identificador de problema duplicado: ${problem.id}.`);
  ids.add(problem.id);
  return problem;
}
export function parseMissionCatalog(value: unknown, sectorIds: readonly string[]): Mission[] {
  const ids = new Set<string>();
  return catalogSections(value, sectorIds.length).flatMap((section, index) =>
    sectionProblems(section, sectorIds[index], index).map((problem) =>
      parseProblem(problem, sectorIds[index], ids),
    ),
  );
}
