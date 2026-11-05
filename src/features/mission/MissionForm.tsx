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
      className="button primary answer-submit min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-primary:bg-primary ds-primary:text-white ds-primary:ds-hover:bg-primary-hover ds-primary:ds-hover:[transform:translateY(-0.0625rem)] ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] mt-4.5 [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
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
