import type { ReportSnapshot, ReportRecord } from '../../../../game/report-types';
export function studentPageData(
  snapshot: ReportSnapshot,
  studentId: string,
  records: ReportRecord[],
) {
  const own = records.filter((record) => record.studentId === studentId);
  const current = own.filter((record) => !record.historical);
  const name = snapshot.students.find((student) => student.studentId === studentId)!.name;
  const historical = own.filter((record) => record.historical);

  return { current, historical, name };
}
