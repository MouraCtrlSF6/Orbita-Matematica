import { useMissionContext } from './hooks/useMissionContext';
import { MissionGuide } from './MissionGuide';
import { MissionChallenge } from './MissionChallenge';

export function MissionLayout() {
  const { mission, session } = useMissionContext();

  return (
    <div className="mission-layout grid [grid-template-columns:minmax(0,_1fr)_17.5rem] gap-6 items-start ds-down-desktop:[grid-template-columns:minmax(0,_1fr)_14.6875rem] ds-down-desktop:gap-4.5 ds-down-tablet:[grid-template-columns:1fr]">
      <MissionChallenge />
      <MissionGuide
        hints={mission.hints.slice(0, session.hintLimit)}
        openHints={session.hints}
        done={session.done}
        onHint={session.requestHint}
      />
    </div>
  );
}
