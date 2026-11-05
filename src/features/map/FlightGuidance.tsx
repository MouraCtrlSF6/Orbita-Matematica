import type { FlightViewProps } from './flight-scene-types';

interface FlightGuidanceProps {
  world: FlightViewProps['world'];
  nextId?: FlightViewProps['nextId'];
}

export function FlightGuidance({ world, nextId }: FlightGuidanceProps) {
  const target = world.destinations.find((item) => item.id === nextId);

  if (!target) return null;
  return (
    <p
      className="flight-guidance text-small py-2.5 px-4.5 text-[#c8ffe9] flex items-center gap-2.5 [&_>_span]:inline-block [&_>_span]:text-challenge-compact ds-down-mobile:py-2.5 ds-down-mobile:px-3"
      role="status"
    >
      <span aria-hidden="true">➜</span> Próximo destino: {target.label}
    </p>
  );
}
