import type { FlightViewProps } from '../../flight-scene-types';
import { FlightControls } from './FlightControls/FlightControls';
import { DestinationList } from './DestinationList/DestinationList';

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
