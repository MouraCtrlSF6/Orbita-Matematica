import { useMissionContext } from '../hooks/useMissionContext';
import { MissionChallenge } from './MissionChallenge/MissionChallenge';
import { MissionGuide } from './MissionGuide/MissionGuide';

export function MissionLayout() {
  const { mission, session } = useMissionContext();

  return (
    <div
      style={session.hintLimit === 0 ? { gridTemplateColumns: '1fr' } : undefined}
      className="mission-layout grid grid-cols-[minmax(0,1fr)_17.5rem] gap-6 items-start ds-down-desktop:grid-cols-[minmax(0,1fr)_14.6875rem] ds-down-desktop:gap-4.5 ds-down-tablet:grid-cols-[1fr]"
    >
      <MissionChallenge />
      {session.hintLimit > 0 && (
        <MissionGuide
          hints={mission.hints.slice(0, session.hintLimit)}
          openHints={session.hints}
          done={session.done}
          onHint={session.requestHint}
        />
      )}
    </div>
  );
}
