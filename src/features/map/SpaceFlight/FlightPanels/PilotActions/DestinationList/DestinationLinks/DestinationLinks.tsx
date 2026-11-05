import type { FlightViewProps } from '../../../../flight-scene-types';
import { DestinationLink } from './DestinationLink/DestinationLink';

interface DestinationLinksProps {
  world: FlightViewProps['world'];
  statuses: FlightViewProps['statuses'];
  controller: FlightViewProps['controller'];
  paused?: FlightViewProps['paused'];
}

export function DestinationLinks({ world, statuses, controller, paused }: DestinationLinksProps) {
  return (
    <ol>
      {world.destinations.map((destination) => (
        <li key={destination.id}>
          <DestinationLink
            destination={destination}
            status={statuses[destination.id]}
            controller={controller}
            paused={paused}
          />
        </li>
      ))}
    </ol>
  );
}
