import { View } from '@react-pdf/renderer';
import type { ReportStats } from '../../../game/report-types';
import { Donut } from '../Donut/Donut';
import { styles } from '../styles';

interface SectorChartsProps {
  stats: ReportStats;
}

export function SectorCharts({ stats }: SectorChartsProps) {
  return (
    <View style={styles.charts}>
      <Donut
        title="Conclusão"
        entries={[
          { label: 'Concluídas', value: stats.completed },
          { label: 'Em andamento', value: stats.inProgress },
          { label: 'Não iniciadas', value: stats.notStarted },
          { label: 'Sem registro', value: stats.missing },
        ]}
      />
      <Donut
        title="Primeira tentativa"
        entries={[
          { label: 'Certas', value: stats.firstCorrect },
          { label: 'Incorretas', value: stats.firstIncorrect },
        ]}
      />
      <Donut
        title="Dicas nas concluídas"
        entries={[
          { label: 'Com dicas', value: stats.hintedCompleted },
          { label: 'Sem dicas', value: stats.completed - stats.hintedCompleted },
        ]}
      />
    </View>
  );
}
