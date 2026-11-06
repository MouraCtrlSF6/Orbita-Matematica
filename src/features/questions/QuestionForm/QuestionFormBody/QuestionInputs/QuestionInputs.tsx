import { useState } from 'react';
import type { QuestionFormState } from '../hooks/useQuestionForm';
import { sectors } from '../../../../../content/sectors';
import { QuestionSelectors } from './QuestionSelectors/QuestionSelectors';
import { QuestionFields } from './QuestionFields/QuestionFields';
import { FormatConfiguration } from './FormatConfiguration/FormatConfiguration';
import { QuestionSupports } from './QuestionSupports/QuestionSupports';

interface QuestionInputsProps {
  form: QuestionFormState;
}

export function QuestionInputs({ form }: QuestionInputsProps) {
  const [sectorId, setSectorId] = useState(sectors[0].id);

  return (
    <>
      <QuestionSelectors sectorId={sectorId} onChange={setSectorId} />
      <QuestionFields />
      <FormatConfiguration kind={form.kind} setKind={form.setKind} />
      <QuestionSupports sectorId={sectorId} />
    </>
  );
}
