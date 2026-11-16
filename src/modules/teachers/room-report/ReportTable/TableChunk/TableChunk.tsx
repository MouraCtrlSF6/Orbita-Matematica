import { canSplitChunk } from './can-split-chunk';
import { View } from '@react-pdf/renderer';
import { TableRow } from './TableRow/TableRow';
import { styles } from '../../styles';
interface TableChunkProps {
  headers: string[];
  rows: string[][];
  columnWeights: number[];
}
export function TableChunk({ headers, rows, columnWeights }: TableChunkProps) {
  const content = rows.length ? rows : [['0']];
  return (
    <View style={styles.block} wrap={canSplitChunk(content)}>
      <TableRow values={headers} columnWeights={columnWeights} header />
      {content.map((row, index) => (
        <TableRow key={index} values={row} columnWeights={columnWeights} />
      ))}
    </View>
  );
}
