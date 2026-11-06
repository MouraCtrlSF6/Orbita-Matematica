import type { ReportRecord, ReportStats } from './report-types';

export function firstAnswer(record: ReportRecord) {
  const answers = record.answers.filter((answer) => answer.order === 1);

  return answers.length === 1 ? answers[0] : undefined;
}

function progressStats(records: ReportRecord[]) {
  const count = (status: string) => records.filter((record) => record.status === status).length;

  return {
    total: records.length,
    completed: count('completed'),
    inProgress: count('in_progress'),
    notStarted: count('not_started'),
    missing: count('missing'),
  };
}

function initialStats(records: ReportRecord[]) {
  const first = records.map(firstAnswer);

  return {
    firstCorrect: first.filter((answer) => answer?.correct === true).length,
    firstIncorrect: first.filter((answer) => answer?.correct === false).length,
    firstKnown: first.filter((answer) => answer !== undefined).length,
  };
}

function attemptStats(records: ReportRecord[]) {
  const attempts = records.flatMap((record) => record.answers);

  return {
    answers: attempts.length,
    incorrect: attempts.filter((answer) => !answer.correct).length,
  };
}

function completionStats(records: ReportRecord[]) {
  const completed = records.filter((record) => record.status === 'completed');

  return {
    hintedCompleted: completed.filter((record) => record.hints === true).length,
    completedAfterRetry: completed.filter((record) => firstAnswer(record)?.correct === false)
      .length,
  };
}

export function reportStats(records: ReportRecord[]): ReportStats {
  return {
    ...progressStats(records),
    ...initialStats(records),
    ...attemptStats(records),
    ...completionStats(records),
  };
}

export function percentage(value: number, total: number): string {
  return total
    ? `${((value * 100) / total).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`
    : '0';
}

export function recordStatus(record: ReportRecord): string {
  if (record.status === 'missing') return 'Sem registro';
  if (record.status === 'completed') return completionStatus(record);
  return record.answers.length ? 'Em andamento' : 'Não respondida';
}

function completionStatus(record: ReportRecord): string {
  const first = firstAnswer(record);

  if (!first) return 'Concluída sem histórico da primeira tentativa';
  return first.correct ? 'Certa na primeira tentativa' : 'Concluída após novas tentativas';
}

export function hintsLabel(record: ReportRecord): string {
  if (record.hints === null) return 'Sem registro';
  return record.hints ? 'Sim' : 'Não';
}

export function reportFraction(value: number, total: number): string {
  return total ? `${value}/${total} (${percentage(value, total)})` : '0/0';
}
