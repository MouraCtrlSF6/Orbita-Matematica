import type { SpaceDestination } from '../../../../../../game/space';
import type { FlightViewProps } from '../../../flight-scene-types';

export interface FlightContactProps {
  near?: SpaceDestination;
  statuses: FlightViewProps['statuses'];
}

export function FlightContact({ near, statuses }: FlightContactProps) {
  const detail = near ? statuses[near.id]?.detail : 'Aproxime-se de um destino destacado.';

  return (
    <div
      className="flight-contact [&_strong]:block [&_span]:block [&_strong]:text-body [&_span]:text-[#c0cbe2] [&_span]:text-small [&_span]:mt-[0.1875rem] ds-down-mobile:min-w-0"
      role="status"
    >
      <strong>{near?.label ?? 'Explore o espaço'}</strong>
      <span>{detail}</span>
    </div>
  );
}
