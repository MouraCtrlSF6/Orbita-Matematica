import type { Expression } from '../../../../../../../game/types';
import { ExpressionOperands } from './ExpressionOperands/ExpressionOperands';
import { ExpressionType } from './ExpressionType/ExpressionType';
import { ConstantValue } from './ConstantValue/ConstantValue';

export interface ExpressionEditorProps {
  value: Expression;
  onChange: (expression: Expression) => void;
  label?: string;
  depth?: number;
}

export function ExpressionEditor({
  value,
  onChange,
  label = 'Expressão',
  depth = 0,
}: ExpressionEditorProps) {
  return (
    <fieldset className="grid gap-2 border border-line rounded-control p-3 min-w-0">
      <legend>{label}</legend>
      <ExpressionType value={value} onChange={onChange} label={label} depth={depth} />
      <ConstantValue value={value} onChange={onChange} label={label} />
      <ExpressionOperands value={value} onChange={onChange} label={label} depth={depth} />
    </fieldset>
  );
}
