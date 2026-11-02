import type { VisualModel } from '../../game/types';

interface ObjectModelProps {
  model: VisualModel;
}
export function ObjectModel({ model }: ObjectModelProps) {
  return (
    <section className="object-model" aria-label="Representação com objetos">
      <h3>Vamos visualizar?</h3>
      <p>
        {model.groups} {model.groups === 1 ? 'grupo' : 'grupos'} de {model.perGroup} {model.label}
        {model.extra ? `, mais ${model.extra} extras` : ''}.
      </p>
      <div className="object-groups" aria-hidden="true">
        {Array.from({ length: model.groups }, (_, group) => (
          <div className="object-group" key={group}>
            <span>Grupo {group + 1}</span>
            <div>
              {Array.from({ length: model.perGroup }, (_, item) => (
                <i key={item}>◆</i>
              ))}
            </div>
          </div>
        ))}
        {model.extra > 0 ? (
          <div className="object-group extra">
            <span>Extras</span>
            <div>
              {Array.from({ length: model.extra }, (_, item) => (
                <i key={item}>◆</i>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
