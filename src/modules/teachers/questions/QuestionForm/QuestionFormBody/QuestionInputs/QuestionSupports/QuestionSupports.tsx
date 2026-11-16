import { FormField } from '../FormField/FormField';
import { HintFields } from './HintFields/HintFields';
import { VisualFields } from './VisualFields/VisualFields';

interface QuestionSupportsProps {
  sectorId: string;
}

export function QuestionSupports({ sectorId }: QuestionSupportsProps) {
  return (
    <>
      <FormField name="explanation" label="Explicação da resposta" multiline />
      <HintFields sectorId={sectorId} />
      <VisualFields />
    </>
  );
}
