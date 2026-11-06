import { View } from '@react-pdf/renderer';
import { TableChunk } from './TableChunk/TableChunk';
import { tableColumns } from './table-columns';
interface ReportTableProps {
  headers: string[];
  rows: string[][];
  columnWeights?: number[];
}
export function ReportTable({ headers, rows, columnWeights }: ReportTableProps) {
  const weights = tableColumns(headers, columnWeights);
  const size = headers.length <= 2 ? 10 : 4;
  const chunks = Array.from({ length: Math.max(1, Math.ceil(rows.length / size)) }, (_, index) =>
    rows.slice(index * size, index * size + size),
  );
  return (
    <View>
      {chunks.map((chunk, index) => (
        <TableChunk key={index} headers={headers} rows={chunk} columnWeights={weights} />
      ))}
    </View>
  );
}
