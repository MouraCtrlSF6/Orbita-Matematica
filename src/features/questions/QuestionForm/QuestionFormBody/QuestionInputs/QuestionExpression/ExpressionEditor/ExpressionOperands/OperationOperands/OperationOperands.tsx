import type { Expression } from '../../../../../../../../../game/types';
import { ExpressionEditor, type ExpressionEditorProps } from '../../ExpressionEditor';
import { SelectField } from '../../../../SelectField/SelectField';
import { useExpressionOperands } from '../hooks/useExpressionOperands';

interface OperationOperandsProps extends ExpressionEditorProps {
  value: Extract<Expression, { type: 'operation' }>;
}

const operations = [
  { value: 'add', label: 'Adição (+)' },
  { value: 'subtract', label: 'Subtração (−)' },
  { value: 'multiply', label: 'Multiplicação (×)' },
  { value: 'divide', label: 'Divisão (÷)' },
];

export function OperationOperands({
  value,
  onChange,
  label = 'Expressão',
  depth = 0,
}: OperationOperandsProps) {
  const change = useExpressionOperands(value, onChange);

  return (
    <>
      <SelectField
        label={`Operação de ${label.toLowerCase()}`}
        value={value.operation}
        options={operations}
        onChange={change.operation}
      />
      <ExpressionEditor
        value={value.left}
        label={`${label} esquerda`}
        depth={depth + 1}
        onChange={change.left}
      />
      <ExpressionEditor
        value={value.right}
        label={`${label} direita`}
        depth={depth + 1}
        onChange={change.right}
      />
    </>
  );
}
