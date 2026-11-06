import { Text, View } from '@react-pdf/renderer';
import type { ReportRecord } from '../../../../game/report-types';
import { wrongAnswerData } from './wrong-answer-data';
import { hintsLabel } from '../../../../game/report-stats';
import { ReportTable } from '../../ReportTable/ReportTable';
import { styles } from '../../styles';

interface WrongAnswersProps {
  record: ReportRecord;
}

export function WrongAnswers({ record }: WrongAnswersProps) {
  const { wrong, recurring } = wrongAnswerData(record);

  return (
    <View break>
      <Text style={styles.subtitle} minPresenceAhead={65}>
        {record.title}
      </Text>
      <Text style={styles.paragraph}>
        Usou dicas: {hintsLabel(record)}. Respostas incorretas fornecidas:
      </Text>
      <ReportTable headers={['Ordem', 'Tipo / alternativa', 'Resposta fornecida']} rows={wrong} />
      <ReportTable headers={['Resposta incorreta recorrente', 'Ocorrências']} rows={recurring} />
    </View>
  );
}
