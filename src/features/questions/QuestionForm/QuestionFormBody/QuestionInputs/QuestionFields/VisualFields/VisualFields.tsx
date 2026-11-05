import { FormField } from '../../FormField/FormField';

export function VisualFields() {
  return (
    <fieldset className="grid gap-3">
      <legend>Objetos visuais</legend>
      <FormField name="groups" label="Grupos" type="number" min={0} max={20} defaultValue={1} />
      <FormField
        name="perGroup"
        label="Objetos por grupo"
        type="number"
        min={0}
        max={20}
        defaultValue={1}
      />
      <FormField
        name="extra"
        label="Objetos extras"
        type="number"
        min={0}
        max={20}
        defaultValue={0}
      />
    </fieldset>
  );
}
