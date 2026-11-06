import type { SpaceWorld } from '../../../../../../../game/space';

export interface FlightRouteProps {
  world: SpaceWorld;
}

export function FlightRoute({ world }: FlightRouteProps) {
  return (
    <svg
      className="flight-route absolute [inset:0] pointer-events-none [&_polyline]:[fill:none] [&_polyline]:[stroke:#8974ae] [&_polyline]:[stroke-opacity:0.45] [&_polyline]:[stroke-width:2] [&_polyline]:[stroke-dasharray:4_14]"
      width={world.width}
      height={world.height}
    >
      <polyline points={world.destinations.map((item) => `${item.x},${item.y}`).join(' ')} />
    </svg>
  );
}
