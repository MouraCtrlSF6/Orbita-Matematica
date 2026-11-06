import type { QuestionFormProps } from '../QuestionForm';
import { useQuestionForm } from './hooks/useQuestionForm';
import { QuestionInputs } from './QuestionInputs/QuestionInputs';
import { QuestionSubmission } from './QuestionSubmission/QuestionSubmission';

function isPending(external: boolean, internal: boolean) {
  return external || internal;
}

export function QuestionFormBody({ add, pending }: QuestionFormProps) {
  const form = useQuestionForm(add);

  return (
    <form onSubmit={form.submit} className="grid gap-4 mt-4">
      <fieldset disabled={isPending(pending, form.pending)} className="grid gap-4 min-w-0">
        <QuestionInputs form={form} />
        <QuestionSubmission error={form.error} />
      </fieldset>
    </form>
  );
}
