import { Checkbox } from '../../../../../../../components/Checkbox/Checkbox';
import { FormSection } from '../../FormSection/FormSection';
import { VisualConfiguration } from './VisualConfiguration/VisualConfiguration';
import { VisualPreview } from './VisualPreview/VisualPreview';
import { useVisualFields } from './hooks/useVisualFields';

export function VisualFields() {
  const visual = useVisualFields();

  return (
    <FormSection title="Objetos visuais" optional>
      <Checkbox
        name="visualEnabled"
        label="Incluir apoio visual"
        checked={visual.enabled}
        onCheckedChange={visual.toggle}
      />
      <fieldset
        disabled={!visual.enabled}
        className="grid gap-4 p-0 m-0 border-0 min-w-0"
        onInput={visual.update}
      >
        <VisualConfiguration />
      </fieldset>
      <VisualPreview enabled={visual.enabled} model={visual.model} />
    </FormSection>
  );
}
