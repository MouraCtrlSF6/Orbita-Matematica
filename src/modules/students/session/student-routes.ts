import { Screen } from './reducer-types';

export const studentRoomEntry = '/students/rooms/enter';

export function studentRoomPath(name: string) {
  return `/students/rooms/${encodeURIComponent(name)}`;
}

export function studentSectorsPath(name: string) {
  return studentDestinationPath(studentRoomPath(name), Screen.Map);
}

export function studentDestinationPath(
  roomPath: string,
  screen: Screen,
  sectorId?: string,
  missionId?: string,
) {
  if (screen === Screen.Summary) return `${roomPath}/summary`;
  const sectors = `${roomPath}/sectors`;

  if (!sectorId) return sectors;
  const sector = `${sectors}/${encodeURIComponent(sectorId)}`;
  return missionId ? `${sector}/missions/${encodeURIComponent(missionId)}` : sector;
}
