import { Operation, type Expression, type Mission } from './types';

export const constant = (value: number): Expression => ({ type: 'constant', value });
export const variable: Expression = { type: 'variable' };
export const add = (left: Expression, right: Expression): Expression => ({
  type: 'operation',
  operation: Operation.Add,
  left,
  right,
});
export const multiply = (left: Expression, right: Expression): Expression => ({
  type: 'operation',
  operation: Operation.Multiply,
  left,
  right,
});

export function evaluate(expression: Expression | undefined, value: number): number {
  if (!expression) return NaN;
  return evaluateExpression(expression, value);
}

function evaluateExpression(expression: Expression, value: number): number {
  if (expression.type === 'constant') return expression.value;
  if (expression.type === 'variable') return value;
  const left = evaluate(expression.left, value);
  const right = evaluate(expression.right, value);
  return operations[expression.operation](left, right);
}
function divide(left: number, right: number): number {
  if (right === 0) throw new RangeError('Não é possível dividir por zero.');
  return left / right;
}
const operations: Record<Operation, (left: number, right: number) => number> = {
  [Operation.Add]: (left, right) => left + right,
  [Operation.Subtract]: (left, right) => left - right,
  [Operation.Multiply]: (left, right) => left * right,
  [Operation.Divide]: divide,
};
function hasEquivalentAnswer(mission: Mission, answer: string): boolean {
  return [mission.expectedTokens!, ...(mission.equivalentTokens ?? [])].some(
    (tokens) => answer === tokens.join(' '),
  );
}

export function isCorrect(mission: Mission, answer: string, value = mission.variable): boolean {
  if (mission.correctChoice !== undefined) return answer === mission.correctChoice;
  if (mission.expectedTokens) {
    return hasEquivalentAnswer(mission, answer);
  }
  return isWrittenAnswer(mission, answer, value);
}

function isWrittenAnswer(mission: Mission, answer: string, value: number): boolean {
  if (mission.kind === 'text')
    return normalizeAnswer(answer) === normalizeAnswer(mission.expectedAnswer ?? '');
  return /^\d+$/.test(answer.trim()) && Number(answer) === evaluate(mission.expression, value);
}

export function normalizeAnswer(answer: string): string {
  return answer.trim().replace(/\s+/g, ' ').toLocaleLowerCase('pt-BR');
}
