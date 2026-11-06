import { CountAction } from '../../../../CountAction/CountAction';
import { FormSection } from '../../../../FormSection/FormSection';
import { ChoiceList } from './ChoiceList/ChoiceList';
import { useChoices } from './hooks/useChoices';

export function ChoiceFields() {
  const choices = useChoices();

  return (
    <FormSection title="Alternativas" defaultOpen>
      <p className="text-small text-muted m-0">
        Cadastre de 2 a 10 alternativas e selecione uma única resposta correta.
      </p>
      <ChoiceList choices={choices} />
      <CountAction
        count={choices.ids.length}
        limit={10}
        label="Adicionar alternativa"
        onAdd={choices.add}
      />
    </FormSection>
  );
}
