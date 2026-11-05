import type { ProvidedAnswer } from '../../../../../../../../../../../../../../game/room-progress';
import { AttemptContext } from './AttemptContext/AttemptContext';

export interface AttemptProps {
  attempt: ProvidedAnswer;
}

export function Attempt({ attempt }: AttemptProps) {
  return (
    <li>
      {attempt.answer.label} · {attempt.answer.value} · {attempt.correct ? 'Correta' : 'Incorreta'}
      <AttemptContext attempt={attempt} />
    </li>
  );
}
