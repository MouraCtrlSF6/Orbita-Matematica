import type { MissionResult } from '../../../../../../../../../../game/types';

export interface AuthoredProblemProps {
  creation?: MissionResult['creation'];
}

export function AuthoredProblem({ creation }: AuthoredProblemProps) {
  if (!creation) return null;
  return (
    <p>
      Seu problema: {creation.variable} robôs levam 2 {creation.context} cada; a base guarda mais 4.
      Total: {2 * creation.variable + 4}.
    </p>
  );
}
