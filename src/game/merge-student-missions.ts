import { sectorStatus, type RoomStudent } from './room-progress';

export function mergeStudentMissions(existing: RoomStudent, incoming: RoomStudent) {
  const merged = structuredClone(existing);
  const patch: Record<string, unknown> = {};

  for (const [sectorId, sector] of Object.entries(incoming.sectors)) {
    if (!merged.sectors[sectorId]) {
      merged.sectors[sectorId] = sector;
      patch[`sectors/${sectorId}`] = sector;
    } else {
      mergeSector(merged, sectorId, sector, patch);
    }
  }
  return { merged, patch };
}

function mergeSector(
  student: RoomStudent,
  sectorId: string,
  incoming: RoomStudent['sectors'][string],
  patch: Record<string, unknown>,
) {
  const sector = student.sectors[sectorId];

  for (const [id, mission] of Object.entries(incoming.missions)) {
    if (sector.missions[id]) continue;
    sector.missions[id] = mission;
    patch[`sectors/${sectorId}/missions/${id}`] = mission;
  }
  const status = sectorStatus(
    Object.fromEntries(Object.keys(incoming.missions).map((id) => [id, sector.missions[id]])),
  );

  if (status === sector.sectorStatus) return;
  sector.sectorStatus = status;
  patch[`sectors/${sectorId}/sectorStatus`] = status;
}
