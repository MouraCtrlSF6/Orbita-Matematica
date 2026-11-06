import { FormField } from '../../FormField/FormField';
import { TextAreaField } from '../TextAreaField/TextAreaField';
import { TokenFields } from './TokenFields/TokenFields';

export function BuildFields() {
  return (
    <fieldset className="grid gap-3">
      <legend>Montagem de expressão</legend>
      <TokenFields />
      <TextAreaField name="equivalentTokens" label="Outras ordens equivalentes, uma por linha" />
      <FormField
        name="variable"
        label="Valor de x"
        type="number"
        min={-10000}
        max={10000}
        defaultValue={2}
      />
    </fieldset>
  );
}
