import type { MissionResult } from '../../game/types';
import { type DiscoveryProps } from './summary-types';
import { AuthoredProblem } from './AuthoredProblem';

function resultDescription(result?: MissionResult): string {
  if (!result) return 'Uma descoberta pela frente';
  return `${result.guided ? 'Concluída com solução guiada' : 'Concluída'} · ${result.hints} pistas${result.visual ? ' · objetos utilizados' : ''}`;
}

export function DiscoveryDetails({ mission, result }: DiscoveryProps) {
  return (
    <div>
      <strong>{mission.title}</strong>
      <span>{resultDescription(result)}</span>
      <AuthoredProblem creation={result?.creation} />
    </div>
  );
}
