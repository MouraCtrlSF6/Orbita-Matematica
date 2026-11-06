import type { ReportRecord } from '../../../game/report-types';
import { errorExtremes, extremeLabels } from '../../../game/report-comparisons';
export function comparisonBlocks(records: ReportRecord[]) {
  return [
    { title: 'Mais respostas incorretas', text: errorExtremes(records, true) },
    { title: 'Menos respostas incorretas', text: errorExtremes(records, false) },
    { title: 'Maior taxa de erros iniciais', text: extremeLabels(records, false) },
    { title: 'Maior taxa de acertos iniciais', text: extremeLabels(records, true) },
  ];
}
