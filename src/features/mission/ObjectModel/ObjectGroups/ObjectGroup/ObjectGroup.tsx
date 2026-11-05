import { ObjectItems } from './ObjectItems/ObjectItems';

export interface ObjectGroupProps {
  label: string;
  count: number;
  extra?: boolean;
}

export function ObjectGroup({ label, count, extra = false }: ObjectGroupProps) {
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
