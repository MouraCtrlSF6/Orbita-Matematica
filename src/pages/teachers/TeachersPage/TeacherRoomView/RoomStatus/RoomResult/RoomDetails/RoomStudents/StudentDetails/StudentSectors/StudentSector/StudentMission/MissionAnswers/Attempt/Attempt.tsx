import type { ProvidedAnswer } from '../../../../../../../../../../../../../../game/room-progress';
import { AttemptContext } from './AttemptContext/AttemptContext';

export interface AttemptProps {
  attempt: ProvidedAnswer;
}

export function Attempt({ attempt }: AttemptProps) {
  return (
    <li className="my-2 text-black">
      {attempt.answer.label} · {attempt.answer.value} ·{' '}
      <span className={attempt.correct ? 'text-lime-600' : 'text-danger'}>
        {attempt.correct ? 'Correta' : 'Incorreta'}
      </span>
      <AttemptContext attempt={attempt} />
    </li>
  );
}
