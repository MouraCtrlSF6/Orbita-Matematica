import { type FlightViewProps } from './flight-scene-types';
import { DestinationMarker } from './DestinationMarker';

interface DestinationMarkersProps {
  world: FlightViewProps['world'];
  statuses: FlightViewProps['statuses'];
  nextId?: FlightViewProps['nextId'];
}

export function DestinationMarkers({ world, statuses, nextId }: DestinationMarkersProps) {
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
