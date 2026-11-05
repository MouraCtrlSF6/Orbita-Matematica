import { MissionSupport } from './MissionSupport';
import { MissionForm } from './MissionForm';
import { MissionFeedback } from './MissionFeedback';
import { ChallengeIntro } from './ChallengeIntro';

export function MissionChallenge() {
  return (
    <section
      className="challenge-card py-7 px-7.5 bg-white [border:1px_solid_var(--line)] rounded-card [&_h2]:text-challenge [&_h2]:font-bold [&_h2]:leading-[1.6] [&_h2]:tracking-[-0.0375rem] ds-down-desktop:p-[1.4375rem] ds-down-desktop:[&_h2]:text-challenge-compact ds-down-mobile:p-5 ds-down-mobile:[&_h2]:text-challenge-compact"
      aria-labelledby="challenge-heading"
    >
      <ChallengeIntro />
      <MissionSupport />
      <MissionForm />
      <MissionFeedback />
    </section>
  );
}
