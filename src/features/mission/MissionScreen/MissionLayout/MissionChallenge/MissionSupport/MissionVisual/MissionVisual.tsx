import { ObjectModel } from '../../../../../ObjectModel/ObjectModel';
import { useMissionContext } from '../../../../hooks/useMissionContext';

export function MissionVisual() {
  const { mission, session } = useMissionContext();

  if (!session.visual) return null;
  const model = session.creation
    ? {
        groups: session.variable,
        perGroup: 2,
        extra: 4,
        label: session.context,
      }
    : mission.visual;

  return <ObjectModel model={model} />;
}
