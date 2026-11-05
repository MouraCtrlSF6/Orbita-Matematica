import type { QuestionFormState } from '../hooks/useQuestionForm';
import { QuestionSelectors } from './QuestionSelectors/QuestionSelectors';
import { QuestionFields } from './QuestionFields/QuestionFields';
import { FormatFields } from './FormatFields/FormatFields';
import { QuestionExpression } from './QuestionExpression/QuestionExpression';

interface QuestionInputsProps {
  form: QuestionFormState;
}

export function QuestionInputs({ form }: QuestionInputsProps) {
  return (
    <>
      <QuestionSelectors kind={form.kind} setKind={form.setKind} />
      <QuestionFields />
      <FormatFields kind={form.kind} />
      <QuestionExpression kind={form.kind} value={form.expression} onChange={form.setExpression} />
    </>
  );
}
