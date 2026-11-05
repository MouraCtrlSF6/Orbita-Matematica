import { type ObjectModelProps } from './object-model-types';

export function ObjectDescription({ model }: ObjectModelProps) {
  return (
    <p>
      {model.groups} {model.groups === 1 ? 'grupo' : 'grupos'} de {model.perGroup} {model.label}
      {model.extra ? `, mais ${model.extra} extras` : ''}.
    </p>
  );
}
