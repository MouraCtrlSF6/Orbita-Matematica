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
    <button
      className="button primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-primary:bg-primary ds-primary:text-white ds-primary:ds-hover:bg-primary-hover ds-primary:ds-hover:[transform:translateY(-0.0625rem)] ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      onClick={onNext}
    >
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
  return `feedback rounded-soft mt-[1.4375rem] p-4.5 text-support ds-success:bg-success ds-success:[border:1px_solid_var(--color-success-border)] ds-success:text-success-ink ds-retry:bg-retry ds-retry:[border:1px_solid_#ead8b8] ds-retry:text-[#775829] [&_p]:mt-[0.6875rem] ${done ? 'success' : 'retry'}`;
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
