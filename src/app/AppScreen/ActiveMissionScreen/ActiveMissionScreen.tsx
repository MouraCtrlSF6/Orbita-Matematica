import { useStudentGame } from '../../../pages/students/hooks/useStudentGame';
import { missionById } from '../../../content/missions';
import { MissionScreen } from '../../../features/mission/MissionScreen/MissionScreen';

export function ActiveMissionScreen() {
  const { state, navigation } = useStudentGame();

  const mission = missionById.get(state.missionId ?? '');

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
