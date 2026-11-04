import type { Mission } from '../../game/types';
import type { MissionSession } from './hooks/useMission';
export interface MissionViewProps {
  mission: Mission;
  session: MissionSession;
}
