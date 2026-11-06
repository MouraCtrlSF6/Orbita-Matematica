import { Operation, type Expression } from '../../../../../../../../../game/types';

export function useExpressionOperands(
  value: Extract<Expression, { type: 'operation' }>,
  onChange: (value: Expression) => void,
) {
  return {
    operation: (operation: string) => onChange({ ...value, operation: operation as Operation }),
    left: (left: Expression) => onChange({ ...value, left }),
    right: (right: Expression) => onChange({ ...value, right }),
  };
}
