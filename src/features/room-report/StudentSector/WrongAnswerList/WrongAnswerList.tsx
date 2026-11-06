import { View } from '@react-pdf/renderer';
import type { ReportRecord } from '../../../../game/report-types';
import { WrongAnswers } from '../WrongAnswers/WrongAnswers';
interface WrongAnswerListProps {
  records: ReportRecord[];
}
export function WrongAnswerList({ records }: WrongAnswerListProps) {
  const incorrect = records.filter((record) => record.answers.some((answer) => !answer.correct));
  return (
    <View>
      {incorrect.map((record) => (
        <WrongAnswers key={record.missionId} record={record} />
      ))}
    </View>
  );
}
