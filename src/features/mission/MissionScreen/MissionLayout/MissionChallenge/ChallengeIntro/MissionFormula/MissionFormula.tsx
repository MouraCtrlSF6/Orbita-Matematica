import { ChallengeKind } from '../../../../../../../game/types';
import { useMissionContext } from '../../../../hooks/useMissionContext';

export function MissionFormula() {
  const { mission, session } = useMissionContext();

  if (!mission.formula || mission.kind === ChallengeKind.Build || session.creation) return null;
  return (
    <div
      className="formula text-formula font-bold [background:#f8f6fc] text-[#70579e] [border:1px_solid_#e9e2f4] rounded-soft mt-6 p-[1.0625rem] text-center tracking-[0.03125rem] ds-down-mobile:text-control"
      aria-label={`Expressão: ${mission.formula}`}
    >
      {mission.formula}
    </div>
  );
}
