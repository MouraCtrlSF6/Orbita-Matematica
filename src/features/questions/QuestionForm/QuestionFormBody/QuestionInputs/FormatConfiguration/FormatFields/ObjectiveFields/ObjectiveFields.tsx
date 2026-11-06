import { ChoiceFields } from './ChoiceFields/ChoiceFields';
import { TokenEditor } from '../../../TokenEditor/TokenEditor';

export function ObjectiveFields() {
  return (
    <div className="grid gap-4">
      <ChoiceFields />
      <TokenEditor name="expressionTokens" label="Expressão" optional />
    </div>
  );
}
