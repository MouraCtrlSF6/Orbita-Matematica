import type { ReactNode } from 'react';
import type { FlightViewProps } from '../flight-scene-types';

export interface FlightPanelsProps {
  world: FlightViewProps['world'];
  statuses: FlightViewProps['statuses'];
  controller: FlightViewProps['controller'];
  nextId?: string;
  nearId?: string;
  paused?: boolean;
}

export interface ControlKey {
  key: string;
  symbol: ReactNode;
  label: string;
}
