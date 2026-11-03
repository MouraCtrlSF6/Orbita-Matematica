export interface Point {
  x: number;
  y: number;
}
export interface SpaceDestination extends Point {
  id: string;
  label: string;
  kind: 'planet' | 'moon' | 'asteroid';
}
export interface SpaceWorld {
  width: number;
  height: number;
  destinations: SpaceDestination[];
}

export function createWorld(items: { id: string; label: string }[]): SpaceWorld {
  const columns = 4;
  return {
    width: 1600,
    height: Math.max(900, Math.ceil(items.length / columns) * 340 + 240),
    destinations: items.map((item, index) => {
      const row = Math.floor(index / columns);
      const column = row % 2 === 0 ? index % columns : columns - 1 - (index % columns);
      return {
        ...item,
        x: 260 + column * 350,
        y: 280 + row * 340,
        kind: (['planet', 'moon', 'asteroid'] as const)[index % 3],
      };
    }),
  };
}

export function moveShip(
  position: Point,
  direction: Point,
  seconds: number,
  world: SpaceWorld,
): Point {
  const length = Math.hypot(direction.x, direction.y);
  const distance = 300 * Math.min(Math.max(seconds, 0), 0.05);
  return {
    x: Math.max(
      30,
      Math.min(world.width - 30, position.x + (length ? (direction.x / length) * distance : 0)),
    ),
    y: Math.max(
      30,
      Math.min(world.height - 30, position.y + (length ? (direction.y / length) * distance : 0)),
    ),
  };
}

export function nearbyDestination(
  position: Point,
  world: SpaceWorld,
): SpaceDestination | undefined {
  return world.destinations.find(
    (destination) => Math.hypot(destination.x - position.x, destination.y - position.y) <= 125,
  );
}

export function approach(destination?: Point): Point {
  return destination ? { x: destination.x, y: destination.y + 110 } : { x: 260, y: 390 };
}

export function cameraPosition(position: Point, world: SpaceWorld, viewport: Point): Point {
  return {
    x: Math.max(0, Math.min(world.width - viewport.x, position.x - viewport.x / 2)),
    y: Math.max(0, Math.min(world.height - viewport.y, position.y - viewport.y / 2)),
  };
}
