import { describe, expect, it } from 'vitest';
import { missions } from '../content/missions';
import { sectors } from '../content/sectors';
import { approach, cameraPosition, createWorld, moveShip, nearbyDestination } from './space';

describe('space exploration rules', () => {
  it('moves at equal speed on axes and diagonals and stops immediately', () => {
    const world = createWorld([]);
    const start = { x: 500, y: 500 };
    const axis = moveShip(start, { x: 1, y: 0 }, 0.04, world);
    const diagonal = moveShip(start, { x: 1, y: 1 }, 0.04, world);
    expect(axis.x).toBe(512);
    expect(Math.hypot(diagonal.x - start.x, diagonal.y - start.y)).toBeCloseTo(12);
    expect(moveShip(start, { x: 0, y: 0 }, 0.04, world)).toEqual(start);
    const frames = (count: number) =>
      Array.from({ length: count }).reduce<{ x: number; y: number }>(
        (position) => moveShip(position, { x: 1, y: 0 }, 1 / count, world),
        start,
      );
    expect(frames(60).x).toBeCloseTo(frames(120).x);
    expect(frames(60).x).toBeCloseTo(800);
  });

  it('limits long frames, prevents reverse time and keeps the ship within world boundaries', () => {
    const world = createWorld([]);
    expect(moveShip({ x: 500, y: 500 }, { x: 1, y: 0 }, 30, world).x).toBe(515);
    expect(moveShip({ x: 500, y: 500 }, { x: 1, y: 0 }, -1, world).x).toBe(500);
    expect(moveShip({ x: 30, y: 30 }, { x: -1, y: -1 }, 1, world)).toEqual({ x: 30, y: 30 });
    expect(
      moveShip({ x: world.width - 30, y: world.height - 30 }, { x: 1, y: 1 }, 1, world),
    ).toEqual({ x: world.width - 30, y: world.height - 30 });
  });

  it('maps every catalog mission in order to stable, spaced destinations', () => {
    for (const sector of sectors) {
      const items = missions
        .filter((item) => item.sectorId === sector.id)
        .map((item) => ({ id: item.id, label: item.title }));
      const world = createWorld(items);
      expect(createWorld(items)).toEqual(world);
      expect(world.destinations.map((item) => item.id)).toEqual(items.map((item) => item.id));
      expect(new Set(world.destinations.map((item) => item.kind)).size).toBe(3);
      for (const item of world.destinations) {
        expect(item.x).toBeGreaterThanOrEqual(200);
        expect(item.x).toBeLessThan(world.width - 200);
        expect(item.y).toBeLessThan(world.height - 120);
        for (const other of world.destinations.filter((other) => other.id !== item.id))
          expect(Math.hypot(item.x - other.x, item.y - other.y)).toBeGreaterThanOrEqual(340);
      }
    }
    expect(
      createWorld(Array.from({ length: 80 }, (_, i) => ({ id: `${i}`, label: `${i}` }))).height,
    ).toBeGreaterThan(
      createWorld(missions.map((item) => ({ id: item.id, label: item.title }))).height,
    );
  });

  it('detects proximity and keeps the camera inside the world even on oversized viewports', () => {
    const world = createWorld([{ id: 'first', label: 'First' }]);
    expect(nearbyDestination(approach(world.destinations[0]), world)?.id).toBe('first');
    expect(nearbyDestination({ x: 10, y: 10 }, world)).toBeUndefined();
    expect(cameraPosition({ x: 500, y: 500 }, world, { x: 400, y: 300 })).toEqual({
      x: 300,
      y: 350,
    });
    expect(cameraPosition({ x: 1590, y: 890 }, world, { x: 400, y: 300 })).toEqual({
      x: 1200,
      y: 600,
    });
    expect(cameraPosition({ x: 10, y: 10 }, world, { x: 2000, y: 2000 })).toEqual({ x: 0, y: 0 });
  });
});
