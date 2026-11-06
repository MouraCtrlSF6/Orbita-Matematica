import { sectors } from '../../../content/sectors';
import type { ReportRecord } from '../../../game/report-types';
import { reportStats, percentage, reportFraction } from '../../../game/report-stats';
export function overviewData(records: ReportRecord[]) {
  const stats = reportStats(records);
  const groups = sectorGroups(records);
  const known = groups.filter((group) => group.stats.firstKnown > 0);
  const maximum = Math.max(...known.map(errorRate));
  const minimum = Math.min(...known.map(errorRate));
  const labels = (rate: number) => sectorLabels(known, rate);

  return { stats, groups, labels, maximum, minimum };
}
export function overviewRows(records: ReportRecord[]) {
  const { groups } = overviewData(records);
  return groups.map((group) => [
    group.name,
    `${group.stats.completed}/${group.stats.total}`,
    `${group.stats.firstCorrect}/${group.stats.firstKnown}`,
    percentage(group.stats.firstIncorrect, group.stats.firstKnown),
    String(group.stats.incorrect),
  ]);
}
export function overviewBlocks(records: ReportRecord[]) {
  const { stats, labels, maximum, minimum } = overviewData(records);
  return [
    {
      title: 'Resumo individual',
      text: `Concluídas: ${reportFraction(stats.completed, stats.total)}. Certas na primeira tentativa: ${reportFraction(stats.firstCorrect, stats.firstKnown)}.`,
    },
    {
      title: 'Tentativas registradas',
      text: `${stats.answers} respostas; ${stats.incorrect} incorretas. Concluídas após novas tentativas: ${stats.completedAfterRetry}.`,
    },
    { title: 'Maior dificuldade observada', text: labels(maximum) },
    { title: 'Maior facilidade observada', text: labels(minimum) },
  ];
}

function sectorGroups(records: ReportRecord[]) {
  const groups = sectors.map((sector) => ({
    name: sector.name,
    stats: reportStats(records.filter((record) => record.sectorId === sector.id)),
  }));

  return groups;
}
type SectorGroup = ReturnType<typeof sectorGroups>[number];
function errorRate(group: SectorGroup) {
  return group.stats.firstIncorrect / group.stats.firstKnown;
}
function sectorLabels(groups: SectorGroup[], rate: number) {
  return (
    groups
      .filter((group) => errorRate(group) === rate)
      .map(
        (group) =>
          `${group.name}: ${group.stats.firstIncorrect}/${group.stats.firstKnown} erros (${percentage(group.stats.firstIncorrect, group.stats.firstKnown)})`,
      )
      .join('; ') || '0'
  );
}
