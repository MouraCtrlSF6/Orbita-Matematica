import { useMissionContext } from './hooks/useMissionContext';
import { CreatedResult } from './CreatedResult';
import { NextMission } from './NextMission';

export function SuccessDetails() {
  const { mission, session, onNext } = useMissionContext();

  if (!session.done) return null;
  return (
    <>
      <p>{mission.explanation}</p>
      <CreatedResult />
      <NextMission onNext={onNext} />
    </>
  );
}
