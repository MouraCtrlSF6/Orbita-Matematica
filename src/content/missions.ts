import catalog from './problems.json' with { type: 'json' };
import { parseMissionCatalog } from './mission-catalog';
import { sectors } from './sectors';

export const missions = parseMissionCatalog(
  catalog,
  sectors.map((sector) => sector.id),
);

export const missionById = new Map(missions.map((mission) => [mission.id, mission]));
