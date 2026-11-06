import { isMission } from '../content/mission-catalog';
import { evaluate, add, multiply, constant, variable } from './math';
import { sectors } from '../content/sectors';
import { ChallengeKind, type Expression, type Mission } from './types';
import { validateBuildMission, validateExpression } from './token-expression';

export const creationExpression = () => add(multiply(constant(2), variable), constant(4));

export function expressionFormula(expression: Expression): string {
  if (expression.type === 'constant') return String(expression.value);
  if (expression.type === 'variable') return 'x';
  const symbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' };

  return `(${expressionFormula(expression.left)} ${symbols[expression.operation]} ${expressionFormula(expression.right)})`;
}

function requireCondition(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function validateChoices(mission: Mission) {
  const choices = mission.choices ?? [];
  const labels = choices.map((choice) => choice.label.trim());
  const values = choices.map((choice) => choice.value);

  requireCondition(choices.length >= 2 && choices.length <= 10, 'Informe de 2 a 10 alternativas.');

  requireCondition(new Set(labels).size === labels.length, 'As alternativas devem ser diferentes.');
  requireCondition(
    new Set(values).size === values.length,
    'Os valores das alternativas devem ser únicos.',
  );
  requireCondition(
    choices.filter((choice) => choice.value === mission.correctChoice).length === 1,
    'Selecione uma única alternativa correta.',
  );
}

function validateNumber(mission: Mission) {
  const result = evaluate(mission.expression, mission.variable);

  requireCondition(
    Number.isSafeInteger(result) && result >= 0,
    'A resposta numérica deve ser um inteiro não negativo.',
  );
  requireCondition(
    mission.correctChoice === undefined,
    'Questões numéricas não usam alternativas.',
  );
}

function validateCreation(mission: Mission) {
  requireCondition(
    [2, 3, 4].includes(mission.variable),
    'Na criação guiada, x deve ser 2, 3 ou 4.',
  );
  requireCondition(
    JSON.stringify(mission.expression) === JSON.stringify(creationExpression()),
    'A criação guiada usa somente 2 × x + 4.',
  );
  requireCondition(mission.correctChoice === undefined, 'A criação guiada não usa alternativas.');
}

const formatValidators = {
  [ChallengeKind.Choice]: validateChoices,
  [ChallengeKind.Number]: validateNumber,
  [ChallengeKind.Text]: validateText,
  [ChallengeKind.Build]: validateBuildMission,
  [ChallengeKind.Create]: validateCreation,
};

export function validateAuthoredMission(value: unknown): Mission {
  requireCondition(isMission(value), 'Preencha os campos obrigatórios da questão.');
  requireCondition(
    sectors.some((sector) => sector.id === value.sectorId),
    'Selecione um setor existente.',
  );
  if (value.expression) validateExpression(value.expression);
  validateVisualBounds(value);
  formatValidators[value.kind](value);
  return value;
}

function validateVisualBounds(mission: Mission) {
  if (!mission.visual) return;
  const { groups, perGroup, extra } = mission.visual;

  requireCondition(groups * perGroup + extra <= 200, 'Use até 200 objetos no apoio visual.');
}

function validateText(mission: Mission) {
  requireCondition(mission.expectedAnswer?.trim(), 'Informe a resposta esperada.');
  requireCondition(
    mission.correctChoice === undefined,
    'Questões discursivas não usam alternativas.',
  );
}
