import type { FormEvent } from 'react';
import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { AnswerInput } from './AnswerInput';
import { CreationFields } from './CreationFields';
import type { MissionViewProps } from './mission-view';
import type { MissionSession } from './hooks/useMission';
function OptionalCreation({ session }: MissionViewProps) {
  if (!session.creation) return null;
  return (
    <CreationFields
      context={session.context}
      variable={session.variable}
      disabled={session.done}
      onContextChange={session.changeContext}
      onVariableChange={session.changeVariable}
    />
  );
}
function SubmitAnswer({ session }: MissionViewProps) {
  if (session.done) return null;
  return (
    <button
      type="submit"
      className="button primary answer-submit"
      disabled={!session.answer.trim()}
    >
      Conferir resposta
      <Icon name={IconName.Arrow} size={18} />
    </button>
  );
}
function submitAnswer(event: FormEvent, session: MissionSession) {
  event.preventDefault();
  if (session.answer.trim() && !session.done) session.checkAnswer();
}
export function MissionForm(props: MissionViewProps) {
  return (
    <form onSubmit={(event) => submitAnswer(event, props.session)}>
      <OptionalCreation {...props} />
      <AnswerInput
        mission={props.mission}
        answer={props.session.answer}
        onChange={props.session.changeAnswer}
        disabled={props.session.done}
      />
      <SubmitAnswer {...props} />
    </form>
  );
}
