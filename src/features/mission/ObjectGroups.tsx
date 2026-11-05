import { type ObjectModelProps } from './object-model-types';
import { ObjectGroup } from './ObjectGroup';

export function ObjectGroups({ model }: ObjectModelProps) {
  return (
    <div className="object-groups flex gap-[0.5625rem] flex-wrap mt-[0.8125rem]" aria-hidden="true">
      {Array.from({ length: model.groups }, (_, group) => (
        <ObjectGroup key={group} label={`Grupo ${group + 1}`} count={model.perGroup} />
      ))}
      {model.extra > 0 ? <ObjectGroup label="Extras" count={model.extra} extra /> : null}
    </div>
  );
}
