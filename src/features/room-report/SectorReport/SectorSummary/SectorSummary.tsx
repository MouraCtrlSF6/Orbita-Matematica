import { Text, View } from '@react-pdf/renderer';
import type { ReportStats } from '../../../../game/report-types';
import { SectorCharts } from '../../SectorCharts/SectorCharts';
import { styles } from '../../styles';
interface SectorSummaryProps {
  stats: ReportStats;
}
export function SectorSummary({ stats }: SectorSummaryProps) {
  return (
    <View>
      <Text style={styles.paragraph}>
        {stats.answers} respostas registradas · {stats.incorrect} respostas incorretas em todas as
        tentativas.
      </Text>
      <SectorCharts stats={stats} />
      <Text style={styles.note}>
        Conclusão: participações aluno × questão. Primeira tentativa: somente ordem 1 conhecida.
        Dicas: somente questões concluídas.
      </Text>
    </View>
  );
}
