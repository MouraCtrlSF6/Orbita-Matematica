import { FormField } from '../../../FormField/FormField';
import { TokenEditor } from '../../../TokenEditor/TokenEditor';

export function WrittenFields() {
  return (
    <div className="grid gap-4">
      <FormField
        name="expectedAnswer"
        label="Resposta esperada"
        description="A comparação ignora maiúsculas e espaços extras. 2x e x+x são respostas diferentes."
      />
      <TokenEditor name="expressionTokens" label="Expressão" optional />
    </div>
  );
}
