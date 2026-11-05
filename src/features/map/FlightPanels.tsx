import { type FlightPanelsProps } from './flight-panels-types';
import { FlightHud } from './FlightHud';
import { FlightGuidance } from './FlightGuidance';
import { PilotActions } from './PilotActions';

export function FlightPanels(props: FlightPanelsProps) {
  return (
    <>
      <FlightHud {...props} />
      <FlightGuidance {...props} />
      <PilotActions {...props} />
    </>
  );
}
