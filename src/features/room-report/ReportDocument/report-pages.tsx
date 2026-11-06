import { sectors } from '../../../content/sectors';
import type { ReportRecord, ReportSnapshot } from '../../../game/report-types';
import { SectorReport } from '../SectorReport/SectorReport';
import { StudentPages } from './StudentPages/StudentPages';
export function sectorPages(snapshot: ReportSnapshot, records: ReportRecord[]) {
  const current = records.filter((record) => !record.historical);
  return sectors.map((sector) => (
    <SectorReport
      key={sector.id}
      roomName={snapshot.roomName}
      title={sector.name}
      records={current.filter((record) => record.sectorId === sector.id)}
    />
  ));
}
export function studentPages(snapshot: ReportSnapshot, records: ReportRecord[]) {
  const students = [...snapshot.students].sort(
    (a, b) => a.name.localeCompare(b.name, 'pt-BR') || a.studentId.localeCompare(b.studentId),
  );
  return students.map((student) => (
    <StudentPages
      key={student.studentId}
      snapshot={snapshot}
      studentId={student.studentId}
      records={records}
    />
  ));
}
