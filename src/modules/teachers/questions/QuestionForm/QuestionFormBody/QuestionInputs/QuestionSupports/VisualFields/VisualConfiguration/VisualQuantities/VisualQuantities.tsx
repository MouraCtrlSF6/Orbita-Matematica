import { FormField } from '../../../../FormField/FormField';

export function VisualQuantities() {
  return (
    <div className="grid grid-cols-3 gap-3 ds-down-mobile:grid-cols-1">
      <FormField name="groups" label="Grupos" type="number" min={0} max={20} defaultValue={2} />
      <FormField
        name="perGroup"
        label="Objetos por grupo"
        type="number"
        min={0}
        max={20}
        defaultValue={3}
      />
      <FormField
        name="extra"
        label="Objetos extras"
        type="number"
        min={0}
        max={20}
        defaultValue={4}
        description="Objetos extras são os que aparecem fora dos grupos."
      />
    </div>
  );
}
