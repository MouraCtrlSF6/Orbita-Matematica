import { FlightViewport, type FlightViewportProps } from './FlightViewport';
import { FlightInstructions } from './FlightInstructions';

export function ScenePanel(props: FlightViewportProps) {
  return (
    <>
      <FlightInstructions id={props.helpId} />
      <FlightViewport {...props} />
    </>
  );
}
