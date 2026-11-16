import { ReportTextBlocks } from '../../ReportTextBlocks/ReportTextBlocks';
const blocks = [
  {
    title: 'Como interpretar',
    text: 'Questão certa: resposta correta na tentativa de ordem 1. Taxas de acerto e erro usam somente questões com primeira tentativa registrada. Cada aluno por questão é uma observação.',
  },
  {
    title: 'Conclusão e tentativas',
    text: 'Os erros totais incluem todas as tentativas incorretas. Acertar depois não transforma a primeira tentativa em acerto. Conclusão é apresentada separadamente.',
  },
  {
    title: 'Ausência de dados',
    text: 'Sem resposta não significa erro. Conclusões sem histórico não permitem determinar acerto inicial. Não há medição de presença online.',
  },
  {
    title: 'Apoios',
    text: 'Dicas são registradas por questão, sem quantidade ou momento de uso. Os indicadores não representam diagnóstico ou domínio pedagógico.',
  },
  {
    title: 'Catálogo e histórico',
    text: 'Os alunos podem ter catálogos de entrada distintos. Os totais principais usam o catálogo atual; questões retiradas aparecem no histórico. Enunciados históricos não são reconstruídos. A ordem das tentativas é por questão; não há datas ou durações por tentativa.',
  },
];
export function ReadingGuide() {
  return <ReportTextBlocks blocks={blocks} />;
}
