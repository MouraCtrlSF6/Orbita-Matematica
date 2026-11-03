import type { Mission } from '../../game/types';
import type { MissionSession } from './useMission';
export interface MissionViewProps {
  mission: Mission;
  session: MissionSession;
}
