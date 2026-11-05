import type { ProvidedAnswer } from '../../game/room-progress';

export interface AttemptContextProps {
  attempt: ProvidedAnswer;
}

export function AttemptContext({ attempt }: AttemptContextProps) {
  if (attempt.context === undefined) return null;
  return (
    <span>
      {' '}
      · {attempt.context}, x = {attempt.variable}
    </span>
  );
}
