import { useState, type FormEvent } from 'react';
import { ChallengeKind, type Expression, type Mission } from '../../../../../game/types';
import { readQuestionForm } from '../utils/readQuestionForm';

interface FormRequest {
  error: string;
  pending: boolean;
}
interface Submission {
  kind: ChallengeKind;
  expression: Expression;
  add: (mission: Mission) => Promise<boolean>;
  setRequest: (request: FormRequest) => void;
  setExpression: (value: Expression) => void;
}

async function sendQuestion(form: HTMLFormElement, submission: Submission) {
  const mission = readQuestionForm(new FormData(form), submission.kind, submission.expression);

  if (!(await submission.add(mission)))
    throw new Error('A questão não foi salva. Confira a mensagem da sala e tente novamente.');
  form.reset();
  submission.setExpression({ type: 'constant', value: 0 });
}

function submitQuestion(submission: Submission, event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  submission.setRequest({ pending: true, error: '' });
  void sendQuestion(event.currentTarget, submission)
    .then(() => submission.setRequest({ pending: false, error: '' }))
    .catch((reason: unknown) =>
      submission.setRequest({ pending: false, error: formError(reason) }),
    );
}

function formError(reason: unknown) {
  return reason instanceof Error ? reason.message : 'Não foi possível adicionar a questão.';
}

export function useQuestionForm(add: (mission: Mission) => Promise<boolean>) {
  const [kind, setKind] = useState(ChallengeKind.Choice);
  const [expression, setExpression] = useState<Expression>({ type: 'constant', value: 0 });
  const [request, setRequest] = useState<FormRequest>({ error: '', pending: false });
  const submit = submitQuestion.bind(null, { kind, expression, add, setExpression, setRequest });

  return { kind, setKind, expression, setExpression, ...request, submit };
}

export type QuestionFormState = ReturnType<typeof useQuestionForm>;
