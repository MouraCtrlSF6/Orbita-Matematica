import { useMissionCatalog } from '../../session/hooks/useMissionCatalog';
import { useStudentGame } from '../../session/hooks/useStudentGame';

import { MissionScreen } from '../MissionScreen/MissionScreen';

export function ActiveMissionScreen() {
  const missions = useMissionCatalog();

  const { state, navigation } = useStudentGame();

  const mission = missions.find((item) => item.id === state.missionId);

  if (!mission) return null;
  return (
    <MissionScreen
      key={mission.id}
      mission={mission}
      onBack={navigation.returnSector}
      onComplete={navigation.complete}
      onNext={navigation.returnSector}
      onActivity={navigation.recordActivity.bind(null, mission.sectorId, mission.id)}
    />
  );
}
