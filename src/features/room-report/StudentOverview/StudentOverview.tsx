import { Text } from '@react-pdf/renderer';
import type { ReportRecord } from '../../../game/report-types';
import { ReportPage } from '../ReportPage/ReportPage';
import { ReportTable } from '../ReportTable/ReportTable';
import { ReportTextBlocks } from '../ReportTextBlocks/ReportTextBlocks';
import { overviewBlocks, overviewRows } from './overview-data';
import { styles } from '../styles';
interface StudentOverviewProps {
  roomName: string;
  name: string;
  records: ReportRecord[];
}
export function StudentOverview({ roomName, name, records }: StudentOverviewProps) {
  return (
    <ReportPage roomName={roomName} title={`Acompanhamento individual · ${name}`}>
      <ReportTextBlocks blocks={overviewBlocks(records)} />
      <ReportTable
        columnWeights={[2.3, 0.9, 1.6, 1.5, 0.8]}
        headers={[
          'Setor',
          'Concluídas',
          'Certas / base inicial',
          'Taxa de erros inicial',
          'Erros totais',
        ]}
        rows={overviewRows(records)}
      />
      <Text style={styles.note}>
        Destaques baseados apenas na primeira tentativa registrada deste aluno. Sem comparação com
        colegas.
      </Text>
    </ReportPage>
  );
}
