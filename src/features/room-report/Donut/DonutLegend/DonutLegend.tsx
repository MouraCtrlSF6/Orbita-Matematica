import { Text, View } from '@react-pdf/renderer';
import { LegendEntry } from './LegendEntry/LegendEntry';
import { palette, styles } from '../../styles';
import type { DonutEntry } from '../donut-data';
interface DonutLegendProps {
  entries: DonutEntry[];
  total: number;
}
export function DonutLegend({ entries, total }: DonutLegendProps) {
  return (
    <View>
      {entries.map((entry, index) => (
        <LegendEntry key={entry.label} entry={entry} color={palette[index]} total={total} />
      ))}
      <Text style={styles.legend}>Base: {total}</Text>
    </View>
  );
}
