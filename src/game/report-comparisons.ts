import type { ReportRecord } from './report-types';
import { percentage, reportStats } from './report-stats';

export function questionGroups(records: ReportRecord[]) {
  return [...new Set(records.map((record) => record.missionId))].map((id) => {
    const rows = records.filter((record) => record.missionId === id);

    return { id, title: rows[0].title, stats: reportStats(rows) };
  });
}

type QuestionGroup = ReturnType<typeof questionGroups>[number];
function initialCount(group: QuestionGroup, correct: boolean) {
  return correct ? group.stats.firstCorrect : group.stats.firstIncorrect;
}
function initialLabel(group: QuestionGroup, correct: boolean) {
  return `${group.title}: ${initialCount(group, correct)}/${group.stats.firstKnown} (${percentage(initialCount(group, correct), group.stats.firstKnown)})`;
}
function joined(values: string[]) {
  return values.join('; ') || '0';
}
function initialExtremes(groups: QuestionGroup[], correct: boolean) {
  const rate = (group: QuestionGroup) => initialCount(group, correct) / group.stats.firstKnown;
  const highest = Math.max(...groups.map(rate));

  return groups.filter((group) => rate(group) === highest);
}
export function extremeLabels(records: ReportRecord[], correct: boolean): string {
  const groups = questionGroups(records).filter((group) => group.stats.firstKnown > 0);

  return joined(initialExtremes(groups, correct).map((group) => initialLabel(group, correct)));
}
function errorGroups(groups: QuestionGroup[], most: boolean) {
  const values = groups.map((group) => group.stats.incorrect);
  const target = most ? Math.max(...values) : Math.min(...values);

  return groups.filter((group) => group.stats.incorrect === target);
}
export function errorExtremes(records: ReportRecord[], most: boolean): string {
  const groups = questionGroups(records).filter((group) => group.stats.answers > 0);

  return joined(
    errorGroups(groups, most).map(
      (group) => `${group.title}: ${group.stats.incorrect} em ${group.stats.answers} respostas`,
    ),
  );
}
