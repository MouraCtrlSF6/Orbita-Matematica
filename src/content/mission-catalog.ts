import { ChallengeKind, Operation, type Expression, type Mission } from '../game/types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isTextArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isText);
}

function isExpression(value: unknown): value is Expression {
  if (!isRecord(value)) return false;
  if (value.type === 'constant')
    return typeof value.value === 'number' && Number.isFinite(value.value);
  if (value.type === 'variable') return true;
  return (
    value.type === 'operation' &&
    Object.values(Operation).some((operation) => operation === value.operation) &&
    isExpression(value.left) &&
    isExpression(value.right)
  );
}

function isMission(value: unknown): value is Mission {
  if (!isRecord(value)) return false;
  const textFields = [
    'id',
    'sectorId',
    'title',
    'objective',
    'skill',
    'prompt',
    'formula',
    'explanation',
  ];
  if (
    !textFields.every((field) => isText(value[field])) ||
    !Object.values(ChallengeKind).some((kind) => kind === value.kind) ||
    !isExpression(value.expression) ||
    typeof value.variable !== 'number' ||
    !Number.isFinite(value.variable) ||
    !isTextArray(value.hints) ||
    value.hints.length !== 3 ||
    !isRecord(value.visual)
  )
    return false;
  const visual = value.visual;
  if (
    !isText(visual.label) ||
    !['groups', 'perGroup', 'extra'].every(
      (field) =>
        typeof visual[field] === 'number' && Number.isInteger(visual[field]) && visual[field] >= 0,
    )
  )
    return false;
  if (
    value.choices !== undefined &&
    (!Array.isArray(value.choices) ||
      !value.choices.every(
        (choice: unknown) => isRecord(choice) && isText(choice.label) && isText(choice.value),
      ))
  )
    return false;
  if (
    value.kind === ChallengeKind.Choice &&
    (!Array.isArray(value.choices) || value.choices.length < 2)
  )
    return false;
  if (
    value.correctChoice !== undefined &&
    (!isText(value.correctChoice) ||
      !Array.isArray(value.choices) ||
      !value.choices.some(
        (choice: unknown) => isRecord(choice) && choice.value === value.correctChoice,
      ))
  )
    return false;
  if (value.tokens !== undefined && !isTextArray(value.tokens)) return false;
  if (value.expectedTokens !== undefined && !isTextArray(value.expectedTokens)) return false;
  if (
    value.equivalentTokens !== undefined &&
    (!Array.isArray(value.equivalentTokens) || !value.equivalentTokens.every(isTextArray))
  )
    return false;
  if (
    value.kind === ChallengeKind.Build &&
    (!isTextArray(value.tokens) ||
      !value.tokens.length ||
      !isTextArray(value.expectedTokens) ||
      !value.expectedTokens.length)
  )
    return false;
  return true;
}

export function parseMissionCatalog(value: unknown, sectorIds: readonly string[]): Mission[] {
  if (
    !isRecord(value) ||
    value.version !== 3 ||
    !Array.isArray(value.sections) ||
    !value.sections.length ||
    value.sections.length !== sectorIds.length
  ) {
    throw new Error('Catálogo de problemas inválido: versão ou setores incompatíveis.');
  }
  const missions: Mission[] = [];
  const ids = new Set<string>();
  value.sections.forEach((section: unknown, index: number) => {
    if (
      !isRecord(section) ||
      section.id !== sectorIds[index] ||
      !Array.isArray(section.problems) ||
      !section.problems.length
    )
      throw new Error(`Setor inválido na posição ${index + 1} do catálogo.`);
    section.problems.forEach((problem: unknown) => {
      if (!isMission(problem) || problem.sectorId !== section.id) {
        throw new Error(`Problema inválido no setor ${section.id}.`);
      }
      if (ids.has(problem.id))
        throw new Error(`Identificador de problema duplicado: ${problem.id}.`);
      ids.add(problem.id);
      missions.push(problem);
    });
  });
  return missions;
}
