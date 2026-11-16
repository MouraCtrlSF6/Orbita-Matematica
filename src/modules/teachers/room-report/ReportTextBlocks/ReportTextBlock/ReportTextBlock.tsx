import { Text, View } from '@react-pdf/renderer';
import type { TextBlock } from '../ReportTextBlocks';
import { styles } from '../../styles';
interface ReportTextBlockProps {
  block: TextBlock;
}
export function ReportTextBlock({ block }: ReportTextBlockProps) {
  return (
    <View wrap={block.text.length > 1200}>
      <Text style={styles.subtitle} minPresenceAhead={35}>
        {block.title}
      </Text>
      <Text style={styles.paragraph}>{block.text}</Text>
    </View>
  );
}
