import { type ObjectModelProps } from './object-model-types';
import { ObjectDescription } from './ObjectDescription';
import { ObjectGroups } from './ObjectGroups';

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
