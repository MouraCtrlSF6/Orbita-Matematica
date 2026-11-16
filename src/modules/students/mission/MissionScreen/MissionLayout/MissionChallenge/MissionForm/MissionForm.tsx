import type { FormEvent } from 'react';
import { AnswerInput } from './AnswerInput/AnswerInput';
import { useMissionContext } from '../../../hooks/useMissionContext';
import type { MissionSession } from '../../../hooks/useMission';
import { OptionalCreation } from './OptionalCreation/OptionalCreation';
import { SubmitAnswer } from './SubmitAnswer/SubmitAnswer';

function submitAnswer(event: FormEvent, session: MissionSession) {
  event.preventDefault();
  if (session.answer.trim() && !session.done) session.checkAnswer();
}

export function MissionForm() {
  const { mission, session } = useMissionContext();

  return (
    <form onSubmit={(event) => submitAnswer(event, session)}>
      <OptionalCreation />
      <AnswerInput
        mission={mission}
        answer={session.answer}
        onChange={session.changeAnswer}
        disabled={session.done}
      />
      <SubmitAnswer />
    </form>
  );
}
