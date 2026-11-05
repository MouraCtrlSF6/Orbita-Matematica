import { useId } from 'react';
import type { Point, SpaceWorld } from '../../../game/space';
import type { FlightOptions } from '../flightController';
import { FlightPanels } from './FlightPanels/FlightPanels';
import { useSpaceFlight } from './hooks/useSpaceFlight';
import { useSystemReducedMotion } from './hooks/useSystemReducedMotion';
import { ScenePanel } from './ScenePanel/ScenePanel';

export interface SpaceFlightProps extends FlightOptions {
  world: SpaceWorld;
  initialPosition?: Point;
  reducedMotion: boolean;
  onSoundChange?: (enabled: boolean) => void;
}

export function SpaceFlight(props: SpaceFlightProps) {
  const flight = useSpaceFlight(props.world, props.initialPosition, props);

  const systemReduced = useSystemReducedMotion();

  const helpId = useId();

  const reducedClass = props.reducedMotion || systemReduced ? 'flight-reduced' : '';

  return (
    <div
      className={`flight text-flight-ink bg-flight [border:1px_solid_#43516e] rounded-card overflow-hidden [&_button:focus-visible]:[outline-color:var(--color-flight-focus)] [&_summary:focus-visible]:[outline-color:var(--color-flight-focus)] ${reducedClass}`}
    >
      <ScenePanel {...props} {...flight} helpId={helpId} />
      <FlightPanels {...props} {...flight} />
    </div>
  );
}

export type { DestinationStatus } from '../flightController';
