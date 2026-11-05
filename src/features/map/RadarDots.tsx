import type { SpaceWorld } from '../../game/space';

export interface RadarDotsProps {
  world: SpaceWorld;
  nextId?: string;
}

export function RadarDots({ world, nextId }: RadarDotsProps) {
  return (
    <>
      {world.destinations.map((item) => (
        <circle
          key={item.id}
          cx={item.x}
          cy={item.y}
          r="34"
          className={item.id === nextId ? 'radar-next [.flight-map_&]:[fill:#91ffe0]' : ''}
        />
      ))}
    </>
  );
}
