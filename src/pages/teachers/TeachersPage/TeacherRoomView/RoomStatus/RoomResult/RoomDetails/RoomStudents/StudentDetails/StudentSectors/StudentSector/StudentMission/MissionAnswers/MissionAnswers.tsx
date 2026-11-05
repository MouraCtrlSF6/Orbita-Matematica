import type { RoomMission } from '../../../../../../../../../../../../../game/room-progress';
import { Attempt } from './Attempt/Attempt';

function orderedAttempts(mission: RoomMission) {
  return Object.entries(mission.providedAnswers ?? {}).sort(
    ([, left], [, right]) => left.order - right.order,
  );
}

const noAnswers = <p>Nenhuma resposta registrada nesta sala.</p>;

export interface MissionAnswersProps {
  mission: RoomMission;
}

export function MissionAnswers({ mission }: MissionAnswersProps) {
  const attempts = orderedAttempts(mission);

  if (!attempts.length) return noAnswers;
  return (
    <ol>
      {attempts.map(([id, attempt]) => (
        <Attempt key={id} attempt={attempt} />
      ))}
    </ol>
  );
}
