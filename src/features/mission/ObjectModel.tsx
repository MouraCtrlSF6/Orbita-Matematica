import type { VisualModel } from '../../game/types';
interface ObjectModelProps {
  model: VisualModel;
}
function ObjectDescription({ model }: ObjectModelProps) {
  return (
    <p>
      {model.groups} {model.groups === 1 ? 'grupo' : 'grupos'} de {model.perGroup} {model.label}
      {model.extra ? `, mais ${model.extra} extras` : ''}.
    </p>
  );
}
function ObjectItems({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, item) => (
        <i key={item}>◆</i>
      ))}
    </>
  );
}
function ObjectGroup({
  label,
  count,
  extra = false,
}: {
  label: string;
  count: number;
  extra?: boolean;
}) {
  return (
    <div className={`object-group ${extra ? 'extra' : ''}`}>
      <span>{label}</span>
      <div>
        <ObjectItems count={count} />
      </div>
    </div>
  );
}
function ObjectGroups({ model }: ObjectModelProps) {
  return (
    <div className="object-groups" aria-hidden="true">
      {Array.from({ length: model.groups }, (_, group) => (
        <ObjectGroup key={group} label={`Grupo ${group + 1}`} count={model.perGroup} />
      ))}
      {model.extra > 0 ? <ObjectGroup label="Extras" count={model.extra} extra /> : null}
    </div>
  );
}
export function ObjectModel(props: ObjectModelProps) {
  return (
    <section className="object-model" aria-label="Representação com objetos">
      <h3>Vamos visualizar?</h3>
      <ObjectDescription {...props} />
      <ObjectGroups {...props} />
    </section>
  );
}
