import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { ChallengeKind, type Mission, type MissionResult } from '../../game/types';
import { useMission } from './hooks/useMission';
import { MissionGuide } from './MissionGuide';
import { MissionHeading } from './MissionHeading';
import { MissionSupport } from './MissionSupport';
import { MissionForm } from './MissionForm';
import { MissionFeedback } from './MissionFeedback';
import type { MissionViewProps } from './mission-view';
interface MissionScreenProps {
  mission: Mission;
  onComplete: (result: MissionResult) => void;
  onNext: () => void;
  onBack: () => void;
}
interface ChallengeProps extends MissionViewProps {
  onNext: () => void;
}
function ChallengeTop({ mission }: MissionViewProps) {
  return (
    <div className="challenge-top">
      <span className="small-tag">{mission.objective}</span>
      <span className="small-star">
        <Icon name={IconName.Star} size={20} />
      </span>
    </div>
  );
}
function MissionFormula({ mission, session }: MissionViewProps) {
  if (mission.kind === ChallengeKind.Build || session.creation) return null;
  return (
    <div className="formula" aria-label={`Expressão: ${mission.formula}`}>
      {mission.formula}
    </div>
  );
}
function ChallengeIntro(props: MissionViewProps) {
  return (
    <>
      <ChallengeTop {...props} />
      <h2 id="challenge-heading">{props.mission.prompt}</h2>
      <MissionFormula {...props} />
    </>
  );
}
function MissionChallenge(props: ChallengeProps) {
  return (
    <section className="challenge-card" aria-labelledby="challenge-heading">
      <ChallengeIntro {...props} />
      <MissionSupport {...props} />
      <MissionForm {...props} />
      <MissionFeedback {...props} />
    </section>
  );
}
function MissionLayout(props: ChallengeProps) {
  return (
    <div className="mission-layout">
      <MissionChallenge {...props} />
      <MissionGuide
        hints={props.mission.hints.slice(0, props.session.hintLimit)}
        openHints={props.session.hints}
        done={props.session.done}
        onHint={props.session.requestHint}
      />
    </div>
  );
}
export function MissionScreen({ mission, onComplete, onNext, onBack }: MissionScreenProps) {
  const session = useMission(mission, onComplete);
  return (
    <div className="mission-screen">
      <MissionHeading mission={mission} done={session.done} onBack={onBack} />
      <MissionLayout mission={mission} session={session} onNext={onNext} />
    </div>
  );
}
