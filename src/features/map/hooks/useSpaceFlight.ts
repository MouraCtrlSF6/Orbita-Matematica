import { useEffect, useRef, useState } from 'react';
import type { Point, SpaceWorld } from '../../../game/space';
import { attachFlight, FlightController, type FlightOptions } from '../flightController';
export function useSpaceFlight(
  world: SpaceWorld,
  initialPosition: Point | undefined,
  options: FlightOptions,
) {
  const [controller] = useState(() => new FlightController(world, initialPosition));
  const viewportRef = useRef<HTMLDivElement>(null);
  const [nearId, setNearId] = useState<string>();
  useEffect(() => controller.configure(options), [controller, options]);
  useEffect(() => attachFlight(controller, viewportRef.current, setNearId), [controller]);
  return { controller, viewportRef, nearId };
}
function subscribeToMotion(update: (value: boolean) => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const changed = () => update(media.matches);
  changed();
  media.addEventListener('change', changed);
  return () => media.removeEventListener('change', changed);
}
export function useSystemReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => subscribeToMotion(setReduced), []);
  return reduced;
}
