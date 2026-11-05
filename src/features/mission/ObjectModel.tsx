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
    <div
      className={`object-group [border:1px_solid_#c6ded1] rounded-control bg-white p-2.5 min-w-16 [&_>_span]:text-eyebrow [&_>_span]:text-[#657b70] [&_>_span]:block [&_>_div]:flex [&_>_div]:flex-wrap [&_>_div]:gap-[0.3125rem] [&_>_div]:max-w-[6.5625rem] [&_>_div]:mt-[0.3125rem] [&_i]:not-italic [&_i]:text-formula [&_i]:text-[#70ab91] [&.extra]:[border-color:#d9c5e8] [&.extra_i]:text-[#ab8cc6] ${extra ? 'extra' : ''}`}
    >
      <span>{label}</span>
      <div>
        <ObjectItems count={count} />
      </div>
    </div>
  );
}
function ObjectGroups({ model }: ObjectModelProps) {
  return (
    <div className="object-groups flex gap-[0.5625rem] flex-wrap mt-[0.8125rem]" aria-hidden="true">
      {Array.from({ length: model.groups }, (_, group) => (
        <ObjectGroup key={group} label={`Grupo ${group + 1}`} count={model.perGroup} />
      ))}
      {model.extra > 0 ? <ObjectGroup label="Extras" count={model.extra} extra /> : null}
    </div>
  );
}
export function ObjectModel(props: ObjectModelProps) {
  return (
    <section
      className="object-model [background:#f2f7f4] [border:1px_solid_#dce8e1] rounded-soft p-[1.0625rem] my-5 mx-0 [&_h3]:text-body [&_h3]:tracking-[-0.0125rem] [&_>_p]:text-small [&_>_p]:mt-[0.3125rem] [&_>_p]:text-[#4d6759]"
      aria-label="Representação com objetos"
    >
      <h3>Vamos visualizar?</h3>
      <ObjectDescription {...props} />
      <ObjectGroups {...props} />
    </section>
  );
}
