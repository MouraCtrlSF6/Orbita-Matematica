import { useId } from 'react';
import type { Point, SpaceWorld } from '../../game/space';
import type { FlightOptions } from './flightController';
import { FlightViewport } from './FlightScene';
import { FlightPanels } from './FlightPanels';
import { useSpaceFlight, useSystemReducedMotion } from './hooks/useSpaceFlight';
export type { DestinationStatus } from './flightController';
interface SpaceFlightProps extends FlightOptions {
  world: SpaceWorld;
  initialPosition?: Point;
  reducedMotion: boolean;
  onSoundChange?: (enabled: boolean) => void;
}
function FlightInstructions({ id }: { id: string }) {
  return (
    <p
      id={id}
      className="flight-instructions py-3 px-4.5 bg-flight-panel [border-bottom:1px_solid_#34425f] text-[#c6d3ec] text-small ds-down-mobile:p-3"
    >
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
    <div
      className={`flight text-flight-ink bg-flight [border:1px_solid_#43516e] rounded-card overflow-hidden [&_button:focus-visible]:[outline-color:var(--color-flight-focus)] [&_summary:focus-visible]:[outline-color:var(--color-flight-focus)] ${reducedClass}`}
    >
      <ScenePanel {...props} {...flight} helpId={helpId} />
      <FlightPanels {...props} {...flight} />
    </div>
  );
}
