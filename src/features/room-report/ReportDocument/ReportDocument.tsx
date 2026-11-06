import { Document } from '@react-pdf/renderer';
import { sectorPages, studentPages } from './report-pages';
import type { ReportSnapshot } from '../../../game/report-types';
import { reportRecords } from '../../../game/report-records';
import { Identification } from '../Identification/Identification';

interface ReportDocumentProps {
  snapshot: ReportSnapshot;
}

export function ReportDocument({ snapshot }: ReportDocumentProps) {
  const records = reportRecords(snapshot);

  return (
    <Document
      title={`Relatório · ${snapshot.roomName}`}
      author="Órbita Matemática"
      language="pt-BR"
    >
      <Identification snapshot={snapshot} />
      {sectorPages(snapshot, records)}
      {studentPages(snapshot, records)}
    </Document>
  );
}
