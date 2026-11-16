import { Text, View } from '@react-pdf/renderer';
import { DonutRing } from '../DonutRing/DonutRing';
import type { DonutEntry } from '../donut-data';
import { styles } from '../../styles';
interface DonutGraphicProps {
  title: string;
  entries: DonutEntry[];
  total: number;
}
export function DonutGraphic({ title, entries, total }: DonutGraphicProps) {
  return (
    <View>
      <Text style={styles.subtitle}>{title}</Text>
      {total > 0 ? (
        <DonutRing entries={entries} total={total} />
      ) : (
        <Text style={styles.note}>0</Text>
      )}
    </View>
  );
}
