import { Text, View } from '@react-pdf/renderer';
import { percentage } from '../../../../../game/report-stats';
import type { DonutEntry } from '../../donut-data';
import { styles } from '../../../styles';
interface LegendEntryProps {
  entry: DonutEntry;
  color: string;
  total: number;
}
export function LegendEntry({ entry, color, total }: LegendEntryProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
      <View style={{ width: 6, height: 6, backgroundColor: color }} />
      <Text style={styles.legend}>
        {entry.label}: {total ? `${entry.value} (${percentage(entry.value, total)})` : 0}
      </Text>
    </View>
  );
}
