import type { ReportRecord } from '../../../game/report-types';
import { ReportPage } from '../ReportPage/ReportPage';
import { ReportTable } from '../ReportTable/ReportTable';
import { ReportTextBlocks } from '../ReportTextBlocks/ReportTextBlocks';
import { comparisonBlocks } from '../SectorReport/comparison-blocks';
import { studentSectorRows } from './student-sector-rows';
import { WrongAnswerList } from './WrongAnswerList/WrongAnswerList';
interface StudentSectorProps {
  roomName: string;
  title: string;
  records: ReportRecord[];
}
export function StudentSector({ roomName, title, records }: StudentSectorProps) {
  return (
    <ReportPage roomName={roomName} title={title}>
      <ReportTextBlocks blocks={comparisonBlocks(records)} />
      <ReportTable
        columnWeights={[3, 2, 1.3, 0.9, 0.9, 0.9]}
        headers={[
          'Questão',
          'Situação',
          'Primeira tentativa',
          'Tentativas',
          'Incorretas',
          'Usou dicas',
        ]}
        rows={studentSectorRows(records)}
      />
      <WrongAnswerList records={records} />
    </ReportPage>
  );
}
