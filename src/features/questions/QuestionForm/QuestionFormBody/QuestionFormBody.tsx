import type { QuestionFormProps } from '../QuestionForm';
import { useQuestionForm } from './hooks/useQuestionForm';
import { QuestionInputs } from './QuestionInputs/QuestionInputs';
import { QuestionSubmission } from './QuestionSubmission/QuestionSubmission';
import { RequiredFieldsNote } from './RequiredFieldsNote/RequiredFieldsNote';

function isPending(external: boolean, internal: boolean) {
  return external || internal;
}

export function QuestionFormBody({ add, pending }: QuestionFormProps) {
  const form = useQuestionForm(add);

  return (
    <form
      noValidate
      onSubmit={form.submit}
      onInvalidCapture={preventNativeValidation}
      className="grid gap-4 mt-4"
    >
      <fieldset
        disabled={isPending(pending, form.pending)}
        className="grid gap-4 min-w-0 border-0 p-0 m-0"
      >
        <RequiredFieldsNote />
        <QuestionInputs key={form.version} form={form} />
        <QuestionSubmission error={form.error} pending={isPending(pending, form.pending)} />
      </fieldset>
    </form>
  );
}

function preventNativeValidation(event: React.SyntheticEvent) {
  event.preventDefault();
}
