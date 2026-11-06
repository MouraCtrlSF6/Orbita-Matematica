import type { ReportSnapshot } from '../../game/report-types';

export function downloadReport(blob: Blob, snapshot: ReportSnapshot) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const name = snapshot.roomName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]+/gi, '-');
  const date = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
    .format(new Date(snapshot.generatedAt))
    .replace(/[^0-9]/g, '-');

  link.href = url;
  link.download = `orbita-relatorio-${name}-${date}.pdf`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
