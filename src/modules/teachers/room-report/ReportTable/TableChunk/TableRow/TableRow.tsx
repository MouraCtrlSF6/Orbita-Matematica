import { Text, View } from '@react-pdf/renderer';
import { styles } from '../../../styles';
interface TableRowProps {
  values: string[];
  header?: boolean;
  columnWeights: number[];
}
export function TableRow({ values, header = false, columnWeights }: TableRowProps) {
  return (
    <View style={header ? styles.tableHeader : styles.row} minPresenceAhead={header ? 45 : 0}>
      {values.map((value, index) => (
        <Text key={index} style={[styles.cell, { flex: columnWeights[index] }]}>
          {value}
        </Text>
      ))}
    </View>
  );
}
