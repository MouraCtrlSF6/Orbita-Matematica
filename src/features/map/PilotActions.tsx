import type { FlightViewProps } from './flight-scene-types';
import { FlightControls } from './FlightControls';
import { DestinationList } from './DestinationList';

interface PilotActionsProps {
  world: FlightViewProps['world'];
  statuses: FlightViewProps['statuses'];
  controller: FlightViewProps['controller'];
  paused?: FlightViewProps['paused'];
}

export function PilotActions(props: PilotActionsProps) {
  return (
    <>
      <FlightControls {...props} />
      <DestinationList {...props} />
    </>
  );
}
