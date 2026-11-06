import { type ExpressionEditorProps } from '../ExpressionEditor';
import { OperationOperands } from './OperationOperands/OperationOperands';

export function ExpressionOperands(props: ExpressionEditorProps) {
  if (props.value.type !== 'operation') return null;
  return <OperationOperands {...props} value={props.value} />;
}
