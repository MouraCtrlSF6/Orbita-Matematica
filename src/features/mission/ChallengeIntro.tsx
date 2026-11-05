import { useMissionContext } from './hooks/useMissionContext';
import { ChallengeTop } from './ChallengeTop';
import { MissionFormula } from './MissionFormula';

export function ChallengeIntro() {
  const { mission } = useMissionContext();

  return (
    <>
      <ChallengeTop />
      <h2 id="challenge-heading">{mission.prompt}</h2>
      <MissionFormula />
    </>
  );
}
