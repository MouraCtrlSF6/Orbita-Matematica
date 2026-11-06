import { ReadingGuide } from './ReadingGuide/ReadingGuide';
import { sectors } from '../../../content/sectors';
import { identificationData } from './identification-data';
import type { ReportSnapshot } from '../../../game/report-types';
import { ReportPage } from '../ReportPage/ReportPage';
import { ReportTable } from '../ReportTable/ReportTable';

interface IdentificationProps {
  snapshot: ReportSnapshot;
}

export function Identification({ snapshot }: IdentificationProps) {
  const { date, rows } = identificationData(snapshot);

  return (
    <ReportPage roomName={snapshot.roomName} title="Relatório de acompanhamento da sala">
      <ReportTable
        headers={['Identificação', 'Valor']}
        rows={[
          ['Sala', snapshot.roomName],
          ['Capturado em', `${date} · Brasília`],
          ['Alunos registrados', String(snapshot.students.length)],
          ['Setores / questões', `${sectors.length} / ${snapshot.catalog.missions.length}`],
        ]}
      />
      <ReportTable headers={['Setor', 'Questões atuais']} rows={rows} />
      <ReadingGuide />
    </ReportPage>
  );
}
