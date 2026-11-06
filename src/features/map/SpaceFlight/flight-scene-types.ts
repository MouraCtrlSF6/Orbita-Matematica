import type { SpaceWorld } from '../../../game/space';
import { FlightController, type DestinationStatus } from '../flightController';

export interface FlightViewProps {
  world: SpaceWorld;
  statuses: Record<string, DestinationStatus>;
  nextId?: string;
  controller: FlightController;
  paused?: boolean;
  soundEnabled: boolean;
  onSoundChange?: (enabled: boolean) => void;
}
