import { sectors } from '../../../../content/sectors';
import type { ReportRecord } from '../../../../game/report-types';
import { StudentSector } from '../../StudentSector/StudentSector';
export function individualSectorPages(roomName: string, name: string, records: ReportRecord[]) {
  return sectors.map((sector) => (
    <StudentSector
      key={sector.id}
      roomName={roomName}
      title={`${name} · ${sector.name}`}
      records={records.filter((record) => record.sectorId === sector.id)}
    />
  ));
}
export function historicalPages(roomName: string, name: string, records: ReportRecord[]) {
  if (!records.length) return null;
  return (
    <StudentSector
      roomName={roomName}
      title={`${name} · Histórico de questões retiradas`}
      records={records}
    />
  );
}
