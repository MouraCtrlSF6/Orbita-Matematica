import { Text, View } from '@react-pdf/renderer';
import { styles } from '../../styles';

export function ReportFooter() {
  return (
    <View style={styles.footer} fixed>
      <Text
        render={({ pageNumber, totalPages }) =>
          `Órbita Matemática · Página ${pageNumber} de ${totalPages}`
        }
      />
    </View>
  );
}
