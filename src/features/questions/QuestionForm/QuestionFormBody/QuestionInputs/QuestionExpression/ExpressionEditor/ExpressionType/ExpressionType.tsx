import { Operation, type Expression } from '../../../../../../../../game/types';
import { SelectField } from '../../../SelectField/SelectField';

interface ExpressionTypeProps {
  value: Expression;
  onChange: (value: Expression) => void;
  label: string;
  depth: number;
}

function newNode(type: string): Expression {
  if (type === 'variable') return { type: 'variable' };
  if (type === 'constant') return { type: 'constant', value: 0 };
  return {
    type: 'operation',
    operation: Operation.Add,
    left: { type: 'variable' },
    right: { type: 'constant', value: 1 },
  };
}

export function ExpressionType({ value, onChange, label, depth }: ExpressionTypeProps) {
  const options = [
    { value: 'constant', label: 'Número' },
    { value: 'variable', label: 'Variável x' },
    { value: 'operation', label: 'Operação', disabled: depth >= 4 },
  ];

  return (
    <SelectField
      label={`Tipo de ${label.toLowerCase()}`}
      value={value.type}
      options={options}
      onChange={(type) => onChange(newNode(type))}
    />
  );
}
