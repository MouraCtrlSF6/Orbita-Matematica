import { useMissionContext } from '../../../../../../hooks/useMissionContext';

export function CreatedResult() {
  const { session } = useMissionContext();

  if (!session.creation) return null;
  return (
    <p>
      Seu resultado: 2 × {session.variable} + 4 = {session.expected} {session.context}.
    </p>
  );
}
