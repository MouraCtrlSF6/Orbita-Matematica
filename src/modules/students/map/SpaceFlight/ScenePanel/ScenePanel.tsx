import { FlightViewport, type FlightViewportProps } from './FlightViewport/FlightViewport';
import { FlightInstructions } from './FlightInstructions/FlightInstructions';

export function ScenePanel(props: FlightViewportProps) {
  return (
    <>
      <FlightInstructions id={props.helpId} />
      <FlightViewport {...props} />
    </>
  );
}
