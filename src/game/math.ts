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

export function evaluate(expression: Expression, value: number): number {
  if (expression.type === 'constant') return expression.value;
  if (expression.type === 'variable') return value;
  const left = evaluate(expression.left, value);
  const right = evaluate(expression.right, value);
  switch (expression.operation) {
    case Operation.Add:
      return left + right;
    case Operation.Subtract:
      return left - right;
    case Operation.Multiply:
      return left * right;
    case Operation.Divide:
      if (right === 0) throw new RangeError('Não é possível dividir por zero.');
      return left / right;
  }
}

export function isCorrect(mission: Mission, answer: string, value = mission.variable): boolean {
  if (mission.correctChoice !== undefined) return answer === mission.correctChoice;
  if (mission.expectedTokens) {
    return [mission.expectedTokens, ...(mission.equivalentTokens ?? [])].some(
      (tokens) => answer === tokens.join(' '),
    );
  }
  return /^\d+$/.test(answer.trim()) && Number(answer) === evaluate(mission.expression, value);
}
