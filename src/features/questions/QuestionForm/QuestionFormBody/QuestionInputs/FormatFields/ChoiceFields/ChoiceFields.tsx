import { FormField } from '../../FormField/FormField';
import { TextAreaField } from '../TextAreaField/TextAreaField';

export function ChoiceFields() {
  return (
    <fieldset className="grid gap-3">
      <legend>Alternativas</legend>
      <TextAreaField name="choices" label="Alternativas, uma por linha" required />
      <FormField
        name="correctChoice"
        label="Número da alternativa correta"
        type="number"
        min={1}
        max={10}
        defaultValue={1}
      />
      <FormField
        name="variable"
        label="Valor de x"
        type="number"
        min={-10000}
        max={10000}
        defaultValue={0}
      />
    </fieldset>
  );
}
