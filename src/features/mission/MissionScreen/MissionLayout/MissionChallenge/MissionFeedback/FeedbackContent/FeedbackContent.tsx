import { useMissionContext } from '../../../../hooks/useMissionContext';
import { SuccessDetails } from './SuccessDetails/SuccessDetails';

export function FeedbackContent() {
  const { session } = useMissionContext();

  if (!session.feedback) return null;
  return (
    <>
      <strong>{session.feedback}</strong>
      <SuccessDetails />
    </>
  );
}
