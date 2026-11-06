import type { SpaceDestination } from '../../../../../../../../game/space';
import { SpaceBody } from './SpaceBody/SpaceBody';
import { type DestinationStatus } from '../../../../../../flightController';

function destinationState(status?: DestinationStatus): string {
  if (status?.completed) return 'complete';
  return status?.unlocked ? 'available' : 'locked';
}

const statusLabels: Record<string, string> = {
  complete: '✓ Concluída',
  available: '◇ Disponível',
  locked: '▣ Bloqueada',
};

export interface DestinationMarkerProps {
  destination: SpaceDestination;
  status?: DestinationStatus;
  index: number;
  nextId?: string;
}

function nextMarkerClass(nextId: string | undefined, id: string): string {
  return nextId === id ? 'next' : '';
}

export function DestinationMarker({ destination, status, index, nextId }: DestinationMarkerProps) {
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
