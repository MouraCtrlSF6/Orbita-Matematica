import { SectorSummary } from './SectorSummary/SectorSummary';
import type { ReportRecord } from '../../../game/report-types';
import { reportStats } from '../../../game/report-stats';
import { ReportPage } from '../ReportPage/ReportPage';
import { ReportTable } from '../ReportTable/ReportTable';
import { ReportTextBlocks } from '../ReportTextBlocks/ReportTextBlocks';
import { comparisonBlocks } from './comparison-blocks';
import { sectorRows } from './sector-rows';
interface SectorReportProps {
  roomName: string;
  title: string;
  records: ReportRecord[];
}
export function SectorReport({ roomName, title, records }: SectorReportProps) {
  const stats = reportStats(records);
  return (
    <ReportPage roomName={roomName} title={title}>
      <SectorSummary stats={stats} />
      <ReportTextBlocks blocks={comparisonBlocks(records)} />
      <ReportTable
        columnWeights={[3, 1.4, 1.1, 1.3, 0.9, 0.9]}
        headers={[
          'Questão',
          'Certas / base inicial',
          'Erros iniciais',
          'Erros / respostas totais',
          'Concluídas',
          'Com dicas',
        ]}
        rows={sectorRows(records)}
      />
    </ReportPage>
  );
}
