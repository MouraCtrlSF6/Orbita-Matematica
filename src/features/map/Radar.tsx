import { type FlightViewProps } from './flight-scene-types';
import { RadarDots } from './RadarDots';

interface RadarProps {
  world: FlightViewProps['world'];
  nextId?: FlightViewProps['nextId'];
}

export function Radar({ world, nextId }: RadarProps) {
  return (
    <div
      className="flight-map absolute right-3.5 top-3.5 w-[8.4375rem] p-[0.5625rem] [border:1px_solid_#657697] [background:#0c142de8] rounded-option pointer-events-none [&_>_span]:block [&_>_span]:text-micro [&_>_span]:text-[#c2cfe7] [&_>_span]:text-center [&_>_span]:tracking-[0.0625rem] [&_svg]:block [&_svg]:w-full [&_svg]:max-h-[9.6875rem] [&_svg]:mt-[0.4375rem] [&_circle]:[fill:#8b9ab9] ds-down-mobile:w-[5.6875rem] ds-down-mobile:right-2 ds-down-mobile:top-2 ds-down-mobile:p-1.5 ds-down-mobile:[&_>_span]:text-radar ds-down-mobile:[&_svg]:max-h-27.5"
      aria-hidden="true"
    >
      <span>RADAR DA EXPEDIÇÃO</span>
      <svg viewBox={`0 0 ${world.width} ${world.height}`}>
        <RadarDots world={world} nextId={nextId} />
        <circle
          className="radar-ship [.flight-map_&]:[fill:#ffa9ef] [.flight-map_&]:[stroke:var(--color-white)] [.flight-map_&]:[stroke-width:7]"
          r="28"
        />
      </svg>
    </div>
  );
}
