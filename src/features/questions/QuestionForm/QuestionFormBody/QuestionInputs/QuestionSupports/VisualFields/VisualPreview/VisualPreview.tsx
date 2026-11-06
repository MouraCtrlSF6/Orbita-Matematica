import { ObjectModel } from '../../../../../../../mission/ObjectModel/ObjectModel';
import type { VisualModel } from '../../../../../../../../game/types';

interface VisualPreviewProps {
  enabled: boolean;
  model: VisualModel;
}

export function VisualPreview({ enabled, model }: VisualPreviewProps) {
  if (!enabled) return null;
  const total = model.groups * model.perGroup + model.extra;

  return total <= 200 ? (
    <ObjectModel model={model} />
  ) : (
    <p className="text-danger">Use até 200 objetos no apoio visual.</p>
  );
}
