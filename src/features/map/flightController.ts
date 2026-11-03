import type { KeyboardEvent, PointerEvent } from 'react';
import {
  approach,
  cameraPosition,
  moveShip,
  nearbyDestination,
  type Point,
  type SpaceWorld,
} from '../../game/space';
import { createThrusterSound } from './thrusterSound';
export interface DestinationStatus {
  unlocked: boolean;
  completed: boolean;
  detail: string;
}
export interface FlightOptions {
  statuses: Record<string, DestinationStatus>;
  nextId?: string;
  paused?: boolean;
  soundEnabled: boolean;
  onPosition?: (position: Point) => void;
  onVisit: (id: string) => void;
}
const directions: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  w: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  s: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  a: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  d: { x: 1, y: 0 },
};
function normalizeKey(key: string): string {
  return key.length === 1 ? key.toLowerCase() : key;
}
function keyDirection(keys: Set<string>): Point {
  return [...keys].reduce(
    (sum, key) => {
      const value = directions[key] ?? { x: 0, y: 0 };
      return { x: sum.x + value.x, y: sum.y + value.y };
    },
    { x: 0, y: 0 },
  );
}
function isPilotEvent(event: KeyboardEvent): boolean {
  return event.target === event.currentTarget && !event.altKey && !event.ctrlKey && !event.metaKey;
}
function hasMoved(before: Point, after: Point): boolean {
  return before.x !== after.x || before.y !== after.y;
}
export class FlightController {
  private position: Point;
  private keys = new Set<string>();
  private heading = 0;
  private lastTime = 0;
  private nearId?: string;
  private viewport?: HTMLDivElement;
  private onNearby: (id?: string) => void = () => {};
  private options: FlightOptions = { statuses: {}, soundEnabled: true, onVisit: () => {} };
  private thruster = createThrusterSound();
  constructor(
    readonly world: SpaceWorld,
    initialPosition?: Point,
  ) {
    this.position = initialPosition ?? approach(world.destinations[0]);
  }
  configure(options: FlightOptions) {
    this.options = options;
    this.thruster.setEnabled(options.soundEnabled);
    if (options.paused) this.stop();
  }
  connect(viewport: HTMLDivElement, onNearby: (id?: string) => void) {
    this.viewport = viewport;
    this.onNearby = onNearby;
    this.lastTime = 0;
  }
  stop = () => {
    this.keys.clear();
    this.thruster.setMoving(false);
  };
  dispose() {
    this.stop();
    this.thruster.dispose();
    this.viewport = undefined;
  }
  private move(time: number): Point {
    const direction = keyDirection(this.keys);
    const before = this.position;
    if (!this.options.paused && !document.hidden)
      this.position = moveShip(
        before,
        direction,
        this.lastTime ? (time - this.lastTime) / 1000 : 0,
        this.world,
      );
    this.thruster.setMoving(hasMoved(before, this.position));
    this.lastTime = time;
    return direction;
  }
  private renderCamera() {
    if (!this.viewport) return;
    const camera = cameraPosition(this.position, this.world, {
      x: this.viewport.clientWidth,
      y: this.viewport.clientHeight,
    });
    const scene = this.viewport.querySelector<HTMLElement>('.flight-scene');
    if (scene) scene.style.transform = `translate(${-camera.x}px, ${-camera.y}px)`;
  }
  private renderShip(direction: Point) {
    if (direction.x || direction.y)
      this.heading = (Math.atan2(direction.y, direction.x) * 180) / Math.PI + 90;
    const ship = this.viewport?.querySelector<HTMLElement>('.player-ship');
    if (ship)
      ship.style.transform = `translate(${this.position.x}px, ${this.position.y}px) rotate(${this.heading}deg)`;
  }
  private renderRadar() {
    const marker = this.viewport?.querySelector('.radar-ship');
    marker?.setAttribute('cx', String(this.position.x));
    marker?.setAttribute('cy', String(this.position.y));
  }
  private renderGuidance() {
    const target = this.world.destinations.find((item) => item.id === this.options.nextId);
    const arrow = this.viewport
      ?.closest('.flight')
      ?.querySelector<HTMLElement>('.flight-guidance > span');
    if (!target || !arrow) return;
    arrow.style.transform = `rotate(${Math.atan2(target.y - this.position.y, target.x - this.position.x)}rad)`;
  }
  private notifyPosition() {
    const nearby = nearbyDestination(this.position, this.world)?.id;
    if (nearby !== this.nearId) {
      this.nearId = nearby;
      this.onNearby(nearby);
    }
    this.options.onPosition?.({ ...this.position });
  }
  tick(time: number) {
    const direction = this.move(time);
    this.renderCamera();
    this.renderShip(direction);
    this.renderRadar();
    this.renderGuidance();
    this.notifyPosition();
  }
  private press(key: string, event: KeyboardEvent) {
    if (directions[key]) {
      event.preventDefault();
      this.thruster.unlock();
      this.keys.add(key);
    }
    if (key === 'Enter' && !event.repeat) {
      event.preventDefault();
      this.visit();
    }
  }
  keyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isPilotEvent(event) || this.options.paused) return;
    this.press(normalizeKey(event.key), event);
  };
  keyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    this.keys.delete(normalizeKey(event.key));
    if (!this.keys.size) this.thruster.setMoving(false);
  };
  pointerDown(key: string, event: PointerEvent<HTMLButtonElement>) {
    this.thruster.unlock();
    event.currentTarget.setPointerCapture(event.pointerId);
    this.keys.clear();
    this.keys.add(key);
  }
  controlKeyDown(key: string, event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.thruster.unlock();
      this.keys.add(key);
    }
  }
  visit = () => {
    const near = nearbyDestination(this.position, this.world);
    if (!near || !this.options.statuses[near.id]?.unlocked || this.options.paused) return;
    this.stop();
    this.options.onVisit(near.id);
  };
  visitDirect(id: string) {
    this.position = approach(this.world.destinations.find((item) => item.id === id));
    this.options.onPosition?.({ ...this.position });
    this.stop();
    this.options.onVisit(id);
  }
}
export function attachFlight(
  controller: FlightController,
  viewport: HTMLDivElement | null,
  onNearby: (id?: string) => void,
) {
  if (!viewport) return;
  controller.connect(viewport, onNearby);
  const cancel = animateFlight(controller);
  window.addEventListener('blur', controller.stop);
  document.addEventListener('visibilitychange', controller.stop);
  return () => {
    cancel();
    controller.dispose();
    window.removeEventListener('blur', controller.stop);
    document.removeEventListener('visibilitychange', controller.stop);
  };
}
function animateFlight(controller: FlightController) {
  let frame = 0;
  const tick = (time: number) => {
    controller.tick(time);
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}
