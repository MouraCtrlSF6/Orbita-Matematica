import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import type { MissionViewProps } from './mission-view';
interface MissionFeedbackProps extends MissionViewProps {
  onNext: () => void;
}
function CreatedResult({ session }: MissionViewProps) {
  if (!session.creation) return null;
  return (
    <p>
      Seu resultado: 2 × {session.variable} + 4 = {session.expected} {session.context}.
    </p>
  );
}
function NextMission({ onNext }: { onNext: () => void }) {
  return (
    <button className="button primary" onClick={onNext}>
      Continuar exploração
      <Icon name={IconName.Arrow} size={18} />
    </button>
  );
}
function SuccessDetails(props: MissionFeedbackProps) {
  if (!props.session.done) return null;
  return (
    <>
      <p>{props.mission.explanation}</p>
      <CreatedResult {...props} />
      <NextMission onNext={props.onNext} />
    </>
  );
}
function FeedbackContent(props: MissionFeedbackProps) {
  if (!props.session.feedback) return null;
  return (
    <>
      <strong>{props.session.feedback}</strong>
      <SuccessDetails {...props} />
    </>
  );
}
function feedbackClass(feedback: string, done: boolean): string {
  if (!feedback) return '';
  return `feedback ${done ? 'success' : 'retry'}`;
}
export function MissionFeedback({ session, ...props }: MissionFeedbackProps) {
  const { feedbackRef, ...feedback } = session;
  return (
    <div
      ref={feedbackRef}
      tabIndex={-1}
      className={feedbackClass(feedback.feedback, feedback.done)}
      role="status"
    >
      <FeedbackContent {...props} session={session} />
    </div>
  );
}
