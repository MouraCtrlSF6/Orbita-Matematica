import { View } from '@react-pdf/renderer';
import { styles } from '../styles';
import { DonutLegend } from './DonutLegend/DonutLegend';
import { DonutGraphic } from './DonutGraphic/DonutGraphic';
import type { DonutEntry } from './donut-data';
interface DonutProps {
  title: string;
  entries: DonutEntry[];
}
export function Donut({ title, entries }: DonutProps) {
  const total = entries.reduce((sum, entry) => sum + entry.value, 0);
  return (
    <View style={styles.chart} wrap={false}>
      <DonutGraphic title={title} entries={entries} total={total} />
      <DonutLegend entries={entries} total={total} />
    </View>
  );
}
