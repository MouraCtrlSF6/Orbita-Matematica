import { useState, type FormEvent } from 'react';
import { ChallengeKind, type Mission } from '../../../../../game/types';
import { readQuestionForm } from '../utils/readQuestionForm';
import { validateQuestionForm } from '../utils/validateQuestionForm';

interface FormRequest {
  error: string;
  pending: boolean;
}

interface Submission {
  kind: ChallengeKind;
  pending: boolean;
  add: (mission: Mission) => Promise<boolean>;
  complete: () => void;
  setRequest: (request: FormRequest) => void;
}

function formError(reason: unknown) {
  return reason instanceof Error ? reason.message : 'Não foi possível adicionar a questão.';
}

async function sendQuestion(element: HTMLFormElement, submission: Submission) {
  const mission = readQuestionForm(new FormData(element), submission.kind);

  if (!(await submission.add(mission)))
    throw new Error('A questão não foi salva. Confira a mensagem da sala e tente novamente.');
  submission.complete();
}

function submitQuestion(submission: Submission, event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  if (submission.pending || !validateQuestionForm(event.currentTarget)) return;
  submission.setRequest({ pending: true, error: '' });
  void sendQuestion(event.currentTarget, submission)
    .then(() => submission.setRequest({ pending: false, error: '' }))
    .catch((reason: unknown) =>
      submission.setRequest({ pending: false, error: formError(reason) }),
    );
}

export function useQuestionForm(add: (mission: Mission) => Promise<boolean>) {
  const [kind, setKind] = useState(ChallengeKind.Choice);
  const [version, setVersion] = useState(0);
  const [request, setRequest] = useState({ error: '', pending: false });
  const complete = () => setVersion((current) => current + 1);
  const submit = submitQuestion.bind(null, {
    kind,
    pending: request.pending,
    add,
    complete,
    setRequest,
  });

  return { kind, setKind, version, ...request, submit };
}
export type QuestionFormState = ReturnType<typeof useQuestionForm>;
