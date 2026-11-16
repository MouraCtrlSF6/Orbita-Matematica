import { CreationFields } from './CreationFields/CreationFields';
import { useMissionContext } from '../../../../hooks/useMissionContext';

export function OptionalCreation() {
  const { session } = useMissionContext();

  if (!session.creation) return null;
  return (
    <CreationFields
      context={session.context}
      variable={session.variable}
      disabled={session.done}
      onContextChange={session.changeContext}
      onVariableChange={session.changeVariable}
    />
  );
}
