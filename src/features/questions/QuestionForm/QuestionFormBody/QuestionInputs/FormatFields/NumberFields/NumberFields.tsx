import { FormField } from '../../FormField/FormField';

export function NumberFields() {
  return (
    <FormField
      name="variable"
      label="Valor de x"
      type="number"
      min={-10000}
      max={10000}
      defaultValue={0}
    />
  );
}
