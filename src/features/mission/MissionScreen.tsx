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
import type { MissionActivity } from '../../game/room-progress';
interface MissionScreenProps {
  mission: Mission;
  onComplete: (result: MissionResult) => void;
  onNext: () => void;
  onBack: () => void;
  onActivity?: (activity: MissionActivity) => void;
}
interface ChallengeProps extends MissionViewProps {
  onNext: () => void;
}
function ChallengeTop({ mission }: MissionViewProps) {
  return (
    <div className="challenge-top flex items-center justify-between mb-5.5 gap-3">
      <span className="small-tag text-caption rounded-badge [background:#f1edf7] text-[#746086] py-1.5 px-[0.6875rem] ds-down-mobile:text-eyebrow">
        {mission.objective}
      </span>
      <span className="small-star text-[#b69c6c]">
        <Icon name={IconName.Star} size={20} />
      </span>
    </div>
  );
}
function MissionFormula({ mission, session }: MissionViewProps) {
  if (mission.kind === ChallengeKind.Build || session.creation) return null;
  return (
    <div
      className="formula text-formula font-bold [background:#f8f6fc] text-[#70579e] [border:1px_solid_#e9e2f4] rounded-soft mt-6 p-[1.0625rem] text-center tracking-[0.03125rem] ds-down-mobile:text-control"
      aria-label={`Expressão: ${mission.formula}`}
    >
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
    <section
      className="challenge-card py-7 px-7.5 bg-white [border:1px_solid_var(--line)] rounded-card [&_h2]:text-challenge [&_h2]:font-bold [&_h2]:leading-[1.6] [&_h2]:tracking-[-0.0375rem] ds-down-desktop:p-[1.4375rem] ds-down-desktop:[&_h2]:text-challenge-compact ds-down-mobile:p-5 ds-down-mobile:[&_h2]:text-challenge-compact"
      aria-labelledby="challenge-heading"
    >
      <ChallengeIntro {...props} />
      <MissionSupport {...props} />
      <MissionForm {...props} />
      <MissionFeedback {...props} />
    </section>
  );
}
function MissionLayout(props: ChallengeProps) {
  return (
    <div className="mission-layout grid [grid-template-columns:minmax(0,_1fr)_17.5rem] gap-6 items-start ds-down-desktop:[grid-template-columns:minmax(0,_1fr)_14.6875rem] ds-down-desktop:gap-4.5 ds-down-tablet:[grid-template-columns:1fr]">
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
export function MissionScreen({
  mission,
  onComplete,
  onNext,
  onBack,
  onActivity,
}: MissionScreenProps) {
  const session = useMission(mission, onComplete, onActivity);
  return (
    <div className="mission-screen">
      <MissionHeading mission={mission} done={session.done} onBack={onBack} />
      <MissionLayout mission={mission} session={session} onNext={onNext} />
    </div>
  );
}
