import type { RefObject } from 'react';
import type { SpaceDestination, SpaceWorld } from '../../game/space';
import { SpaceBody } from './SpaceBody';
import { FlightController, type DestinationStatus } from './flightController';
export interface FlightViewProps {
  world: SpaceWorld;
  statuses: Record<string, DestinationStatus>;
  nextId?: string;
  controller: FlightController;
  paused?: boolean;
  soundEnabled: boolean;
  onSoundChange?: (enabled: boolean) => void;
}
interface ViewportProps extends FlightViewProps {
  viewportRef: RefObject<HTMLDivElement | null>;
  helpId: string;
}
function destinationState(status?: DestinationStatus): string {
  if (status?.completed) return 'complete';
  return status?.unlocked ? 'available' : 'locked';
}
const statusLabels: Record<string, string> = {
  complete: '✓ Concluída',
  available: '◇ Disponível',
  locked: '▣ Bloqueada',
};
interface DestinationMarkerProps {
  destination: SpaceDestination;
  status?: DestinationStatus;
  index: number;
  nextId?: string;
}
function nextMarkerClass(nextId: string | undefined, id: string): string {
  return nextId === id ? 'next' : '';
}
function DestinationMarker({ destination, status, index, nextId }: DestinationMarkerProps) {
  const state = destinationState(status);
  const nextClass = nextMarkerClass(nextId, destination.id);
  return (
    <div
      data-destination={destination.id}
      className={`space-destination absolute w-55 text-center [transform:translate(-50%,_-50%)] text-[#99eadb] [&_>_svg]:block [&_>_svg]:w-[7.1875rem] [&_>_svg]:h-[7.1875rem] [&_>_svg]:m-auto [&_>_svg]:[filter:drop-shadow(0_0_0.5625rem_#5ce3d650)] ds-tone-purple:text-[#e4adff] ds-tone-blue:text-[#a7daff] ds-locked:text-[#8290b1] [&.locked_>_svg]:[filter:none] [&.locked_>_svg]:[stroke-dasharray:5_4] ds-complete:text-[#a3f4c9] [&.next_>_svg]:[border:1px_solid_currentColor] [&.next_>_svg]:rounded-full [&.next_>_svg]:p-[0.4375rem] [&.next_>_svg]:[box-shadow:0_0_1.75rem_#85f8d51a] [&_strong]:block [&_strong]:text-flight-ink [&_strong]:text-body [&_strong]:mt-2.5 [&_strong]:leading-[1.4] [&_small]:block [&_small]:text-small [&_small]:mt-[0.3125rem] [.flight-reduced_&_>_svg]:[filter:none] [.flight-reduced_&.next_>_svg]:[box-shadow:none] ${state} ${nextClass}`}
      style={{ left: destination.x, top: destination.y }}
    >
      <SpaceBody kind={destination.kind} />
      <span className="destination-number absolute top-0 right-10.5 text-label font-bold py-0.5 px-[0.3125rem] bg-flight-panel [border:1px_solid_currentColor] rounded-sm">
        {String(index + 1).padStart(2, '0')}
      </span>
      <strong>{destination.label}</strong>
      <small>{statusLabels[state]}</small>
    </div>
  );
}
function DestinationMarkers({ world, statuses, nextId }: FlightViewProps) {
  return (
    <>
      {world.destinations.map((destination, index) => (
        <DestinationMarker
          key={destination.id}
          destination={destination}
          status={statuses[destination.id]}
          index={index}
          nextId={nextId}
        />
      ))}
    </>
  );
}
function FlightRoute({ world }: { world: SpaceWorld }) {
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
function PlayerShip() {
  return (
    <div className="player-ship absolute -left-5 -top-6 w-10 h-12 [will-change:transform] text-[#ffb0ef] [filter:drop-shadow(0_0_0.5rem_#e56de2)] [&_svg]:w-full [&_svg]:h-full [&_svg]:[fill:#291b43] [&_svg]:[stroke:currentColor] [&_svg]:[stroke-width:2] [.flight-reduced_&]:[filter:none] [.flight-reduced_&]:[will-change:auto]">
      <svg viewBox="0 0 40 48">
        <path d="M20 3 36 41 20 33 4 41Z" />
        <path className="ship-flame [stroke:#8fffe8]" d="m15 38 5 8 5-8" />
      </svg>
    </div>
  );
}
function Scene(props: FlightViewProps) {
  return (
    <div
      className="flight-scene absolute left-0 top-0 [will-change:transform] [background-image:radial-gradient(circle_at_20%_40%,_#24526760,_transparent_28%),_radial-gradient(circle_at_78%_70%,_#5f216a45,_transparent_36%),_radial-gradient(circle,_#a6c9dc_0.0625rem,_transparent_0.10625rem),_radial-gradient(circle,_#5aa49f_0.0625rem,_transparent_0.09375rem),_linear-gradient(#8062a515_0.0625rem,_transparent_0.0625rem),_linear-gradient(90deg,_#8062a515_0.0625rem,_transparent_0.0625rem)] [background-size:auto,_auto,_8.1875rem_7.0625rem,_4.5625rem_6.0625rem,_5rem_5rem,_5rem_5rem] [background-position:0_0,_0_0,_1.5rem_0.9375rem,_1.0625rem_3.625rem,_0_0,_0_0] [.flight-reduced_&]:[will-change:auto]"
      style={{ width: props.world.width, height: props.world.height }}
      aria-hidden="true"
    >
      <FlightRoute world={props.world} />
      <DestinationMarkers {...props} />
      <PlayerShip />
    </div>
  );
}
function RadarDots({ world, nextId }: { world: SpaceWorld; nextId?: string }) {
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
function Radar({ world, nextId }: FlightViewProps) {
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
function SoundWaves({ enabled }: { enabled: boolean }) {
  if (!enabled) return <path d="m16 9 6 6m0-6-6 6" />;
  return <path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />;
}
function SoundIcon({ enabled }: { enabled: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4Z" />
      <SoundWaves enabled={enabled} />
    </svg>
  );
}
function soundTitle(enabled: boolean): string {
  return enabled ? 'Desligar som (M)' : 'Ligar som (M)';
}
function SoundToggle({ controller, soundEnabled, onSoundChange, paused }: FlightViewProps) {
  const title = soundTitle(soundEnabled);
  return (
    <button
      type="button"
      className="flight-sound-toggle absolute right-3.5 bottom-3.5 inline-flex items-center gap-2 min-h-11 py-2.5 px-3.5 [border:1px_solid_#8ce7d0] rounded-soft [background:#102e32] text-[#c8ffee] text-small font-semibold [&[aria-pressed='false']]:[border-color:#7586a4] [&[aria-pressed='false']]:[background:#17233d] [&[aria-pressed='false']]:text-flight-secondary-ink ds-hover:[background:#26445a] [&_kbd]:[border:1px_solid_currentColor] [&_kbd]:rounded-xs [&_kbd]:py-[0.0625rem] [&_kbd]:px-1 [&_kbd]:text-caption"
      aria-label="Som da nave"
      aria-pressed={soundEnabled}
      aria-keyshortcuts="m"
      title={title}
      disabled={paused}
      onClick={() => {
        controller.stop();
        onSoundChange?.(!soundEnabled);
      }}
    >
      <SoundIcon enabled={soundEnabled} />
      {soundEnabled ? 'Som ligado' : 'Som desligado'}
      <kbd>M</kbd>
    </button>
  );
}
export function FlightViewport({ viewportRef, helpId, ...props }: ViewportProps) {
  return (
    <div
      ref={viewportRef}
      className="flight-viewport relative [height:clamp(23.75rem,_57vh,_43.75rem)] overflow-hidden isolate [outline-offset:-0.3125rem] [background:#080d20] focus-visible:[outline:0.1875rem_solid_#a6ffe0] [.tutorial-pilot_&]:h-95 ds-down-mobile:h-102.5"
      tabIndex={0}
      role="region"
      aria-label="Área de pilotagem"
      aria-describedby={helpId}
      onBlur={props.controller.stop}
      onKeyDown={props.controller.keyDown}
      onKeyUp={props.controller.keyUp}
    >
      <Scene {...props} />
      <Radar {...props} />
      {props.onSoundChange ? <SoundToggle {...props} /> : null}
    </div>
  );
}
