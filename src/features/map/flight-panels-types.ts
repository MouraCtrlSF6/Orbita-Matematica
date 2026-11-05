import type { FlightViewProps } from './flight-scene-types';

export interface FlightPanelsProps {
  world: FlightViewProps['world'];
  statuses: FlightViewProps['statuses'];
  controller: FlightViewProps['controller'];
  nextId?: string;
  nearId?: string;
  paused?: boolean;
}
