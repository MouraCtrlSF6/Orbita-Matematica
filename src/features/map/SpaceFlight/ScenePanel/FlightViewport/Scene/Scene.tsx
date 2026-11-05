import { type FlightViewProps } from '../../../flight-scene-types';
import { FlightRoute } from './FlightRoute/FlightRoute';
import { DestinationMarkers } from './DestinationMarkers/DestinationMarkers';
import { PlayerShip } from './PlayerShip/PlayerShip';

interface SceneProps {
  world: FlightViewProps['world'];
  statuses: FlightViewProps['statuses'];
  nextId?: FlightViewProps['nextId'];
}

export function Scene(props: SceneProps) {
  return (
    <div
      className="flight-scene absolute left-0 top-0 [will-change:transform] [background-image:radial-gradient(circle_at_20%_40%,_#24526760,_transparent_28%),_radial-gradient(circle_at_78%_70%,_#5f216a45,_transparent_36%),_radial-gradient(circle,_#a6c9dc_0.0625rem,_transparent_0.10625rem),_radial-gradient(circle,_#5aa49f_0.0625rem,_transparent_0.09375rem),_linear-gradient(#8062a515_0.0625rem,_transparent_0.0625rem),_linear-gradient(90deg,_#8062a515_0.0625rem,_transparent_0.0625rem)] [background-size:auto,_auto,_8.1875rem_7.0625rem,_4.5625rem_6.0625rem,_5rem_5rem,_5rem_5rem] [background-position:0_0,_0_0,_1.5rem_0.9375rem,_1.0625rem_3.625rem,_0_0,_0_0] [.flight-reduced_&]:[will-change:auto]"
      style={{ width: props.world.width, height: props.world.height }}
      aria-hidden="true"
    >
      <FlightRoute world={props.world} />
      <DestinationMarkers {...props} />
      <PlayerShip />
    </div>
  );
}
