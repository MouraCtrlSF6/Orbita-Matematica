import type { ReportRecord } from '../../../../game/report-types';
export function wrongAnswerData(record: ReportRecord) {
  const wrong = record.answers.filter((answer) => !answer.correct);
  const values = [...new Set(wrong.map((answer) => answer.answer.value))];
  const recurring = values.map((value) => [
    value,
    String(wrong.filter((answer) => answer.answer.value === value).length),
  ]);

  return {
    wrong: wrong.map((answer) => [String(answer.order), answer.answer.label, answer.answer.value]),
    recurring,
  };
}
