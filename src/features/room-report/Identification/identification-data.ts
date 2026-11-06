import { sectors } from '../../../content/sectors';
import type { ReportSnapshot } from '../../../game/report-types';
export function identificationData(snapshot: ReportSnapshot) {
  const date = new Date(snapshot.generatedAt).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });
  const rows = sectors.map((sector) => [
    sector.name,
    String(snapshot.catalog.missions.filter((mission) => mission.sectorId === sector.id).length),
  ]);

  return { date, rows };
}
