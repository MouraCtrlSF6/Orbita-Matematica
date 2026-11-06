import type { ReportRecord } from '../../../game/report-types';
import { percentage, reportFraction } from '../../../game/report-stats';
import { questionGroups } from '../../../game/report-comparisons';
export function sectorRows(records: ReportRecord[]) {
  const rows = questionGroups(records).map((group) => {
    const value = group.stats;

    return [
      questionLabel(records, group.id, group.title),
      reportFraction(value.firstCorrect, value.firstKnown),
      percentage(value.firstIncorrect, value.firstKnown),
      `${value.incorrect}/${value.answers}`,
      String(value.completed),
      String(records.filter((record) => record.missionId === group.id && record.hints).length),
    ];
  });

  return rows;
}

function questionLabel(records: ReportRecord[], id: string, title: string) {
  const responders = records.filter(
    (record) => record.missionId === id && record.answers.length > 0,
  ).length;
  return `${title} · ${responders} alunos responderam`;
}
