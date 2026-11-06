import { View } from '@react-pdf/renderer';
import { ReportTextBlock } from './ReportTextBlock/ReportTextBlock';

export interface TextBlock {
  title: string;
  text: string;
}
interface ReportTextBlocksProps {
  blocks: TextBlock[];
}
export function ReportTextBlocks({ blocks }: ReportTextBlocksProps) {
  return (
    <View>
      {blocks.map((block) => (
        <ReportTextBlock key={block.title} block={block} />
      ))}
    </View>
  );
}
