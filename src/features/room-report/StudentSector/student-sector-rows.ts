import type { ReportRecord } from '../../../game/report-types';
import { firstAnswer, hintsLabel, recordStatus } from '../../../game/report-stats';
function initialLabel(record: ReportRecord) {
  const first = firstAnswer(record);

  if (!first) return '0';
  return first.correct ? 'Correta' : 'Incorreta';
}

export function studentSectorRows(records: ReportRecord[]) {
  const rows = records.map((record) => [
    record.title,
    recordStatus(record),
    initialLabel(record),
    String(record.answers.length),
    String(record.answers.filter((answer) => !answer.correct).length),
    hintsLabel(record),
  ]);

  return rows;
}
