import { useId } from 'react';
import type { Point, SpaceWorld } from '../../game/space';
import type { FlightOptions } from './flightController';
import { FlightViewport } from './FlightScene';
import { FlightPanels } from './FlightPanels';
import { useSpaceFlight, useSystemReducedMotion } from './useSpaceFlight';
export type { DestinationStatus } from './flightController';
interface SpaceFlightProps extends FlightOptions {
  world: SpaceWorld;
  initialPosition?: Point;
  reducedMotion: boolean;
  onSoundChange?: (enabled: boolean) => void;
}
function FlightInstructions({ id }: { id: string }) {
  return (
    <p id={id} className="flight-instructions">
      Setas ou WASD para pilotar · Solte para parar · Aproxime-se e pressione Enter para entrar. Tab
      sai da pilotagem.
    </p>
  );
}
function ScenePanel(props: Parameters<typeof FlightViewport>[0]) {
  return (
    <>
      <FlightInstructions id={props.helpId} />
      <FlightViewport {...props} />
    </>
  );
}
export function SpaceFlight(props: SpaceFlightProps) {
  const flight = useSpaceFlight(props.world, props.initialPosition, props);
  const systemReduced = useSystemReducedMotion();
  const helpId = useId();
  const reducedClass = props.reducedMotion || systemReduced ? 'flight-reduced' : '';
  return (
    <div className={`flight ${reducedClass}`}>
      <ScenePanel {...props} {...flight} helpId={helpId} />
      <FlightPanels {...props} {...flight} />
    </div>
  );
}
