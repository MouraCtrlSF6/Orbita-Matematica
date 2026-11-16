import { useLocation, useMatch } from 'react-router';
import { Screen, type RoomDestination } from '../../../reducer';

export function useStudentDestination(): RoomDestination {
  const { key } = useLocation();
  const mission = useMatch('/students/rooms/:roomName/sectors/:sectorId/missions/:missionId');
  const sector = useMatch('/students/rooms/:roomName/sectors/:sectorId');
  const summary = useMatch('/students/rooms/:roomName/summary');

  if (mission) {
    return {
      key,
      screen: Screen.Mission,
      sectorId: mission.params.sectorId,
      missionId: mission.params.missionId,
    };
  }
  if (sector) return { key, screen: Screen.Sector, sectorId: sector.params.sectorId };
  return { key, screen: summary ? Screen.Summary : Screen.Map };
}
