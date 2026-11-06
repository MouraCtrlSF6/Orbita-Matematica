import type { Mission } from '../../../../../../../game/types';
import { evaluate } from '../../../../../../../game/math';

function choiceAnswer(mission: Mission) {
  return (
    mission.choices?.find((choice) => choice.value === mission.correctChoice)?.label ??
    String(evaluate(mission.expression, mission.variable))
  );
}

export function expectedAnswer(mission: Mission) {
  if (mission.kind === 'create') return '2 × x + 4: x = 2 → 8; x = 3 → 10; x = 4 → 12.';
  if (!mission.expectedTokens) return choiceAnswer(mission);
  return [mission.expectedTokens, ...(mission.equivalentTokens ?? [])]
    .map((tokens) => tokens.join(' '))
    .join(' ou ');
}
