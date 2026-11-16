import { useHintFields } from './hooks/useHintFields';
import { FormSection } from '../../FormSection/FormSection';
import { HintList } from './HintList/HintList';
import { HintFooter } from './HintFooter/HintFooter';

interface HintFieldsProps {
  sectorId: string;
}

export function HintFields({ sectorId }: HintFieldsProps) {
  const { count, add } = useHintFields();

  return (
    <FormSection title="Dicas" optional>
      <p className="text-small text-muted m-0">
        Adicione dicas à questão. Se o aluno utilizar dicas para resolver a questão, essa informação
        irá ficar disponível na aba Alunos.
      </p>
      <HintList count={count} />
      <HintFooter count={count} sectorId={sectorId} onAdd={add} />
    </FormSection>
  );
}
