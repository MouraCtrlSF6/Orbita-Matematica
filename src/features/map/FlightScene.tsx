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
      className={`space-destination ${state} ${nextClass}`}
      style={{ left: destination.x, top: destination.y }}
    >
      <SpaceBody kind={destination.kind} />
      <span className="destination-number">{String(index + 1).padStart(2, '0')}</span>
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
    <svg className="flight-route" width={world.width} height={world.height}>
      <polyline points={world.destinations.map((item) => `${item.x},${item.y}`).join(' ')} />
    </svg>
  );
}
function PlayerShip() {
  return (
    <div className="player-ship">
      <svg viewBox="0 0 40 48">
        <path d="M20 3 36 41 20 33 4 41Z" />
        <path className="ship-flame" d="m15 38 5 8 5-8" />
      </svg>
    </div>
  );
}
function Scene(props: FlightViewProps) {
  return (
    <div
      className="flight-scene"
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
          className={item.id === nextId ? 'radar-next' : ''}
        />
      ))}
    </>
  );
}
function Radar({ world, nextId }: FlightViewProps) {
  return (
    <div className="flight-map" aria-hidden="true">
      <span>RADAR DA EXPEDIÇÃO</span>
      <svg viewBox={`0 0 ${world.width} ${world.height}`}>
        <RadarDots world={world} nextId={nextId} />
        <circle className="radar-ship" r="28" />
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
      className="flight-sound-toggle"
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
      className="flight-viewport"
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
