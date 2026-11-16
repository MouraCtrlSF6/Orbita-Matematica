import { FormField } from '../../../FormField/FormField';
import { VisualQuantities } from './VisualQuantities/VisualQuantities';

export function VisualConfiguration() {
  return (
    <>
      <p className="text-small text-muted m-0">
        Objetos visuais representam quantidades em grupos para ajudar o aluno a compreender a
        questão.
      </p>
      <FormField name="visualLabel" label="Descrição dos objetos visuais" defaultValue="objetos" />
      <VisualQuantities />
    </>
  );
}
