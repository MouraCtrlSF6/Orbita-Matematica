import { type FlightPanelsProps } from './flight-panels-types';
import { FlightHud } from './FlightHud/FlightHud';
import { FlightGuidance } from './FlightGuidance/FlightGuidance';
import { PilotActions } from './PilotActions/PilotActions';

export function FlightPanels(props: FlightPanelsProps) {
  return (
    <>
      <FlightHud {...props} />
      <FlightGuidance {...props} />
      <PilotActions {...props} />
    </>
  );
}
