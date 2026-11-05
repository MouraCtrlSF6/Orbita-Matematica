import { useMissionContext } from './hooks/useMissionContext';
import { FeedbackContent } from './FeedbackContent';

function feedbackClass(feedback: string, done: boolean): string {
  if (!feedback) return '';
  return `feedback rounded-soft mt-[1.4375rem] p-4.5 text-support ds-success:bg-success ds-success:[border:1px_solid_var(--color-success-border)] ds-success:text-success-ink ds-retry:bg-retry ds-retry:[border:1px_solid_#ead8b8] ds-retry:text-[#775829] [&_p]:mt-[0.6875rem] ${done ? 'success' : 'retry'}`;
}

export function MissionFeedback() {
  const { session } = useMissionContext();

  const { feedbackRef, ...feedback } = session;

  return (
    <div
      ref={feedbackRef}
      tabIndex={-1}
      className={feedbackClass(feedback.feedback, feedback.done)}
      role="status"
    >
      <FeedbackContent />
    </div>
  );
}
