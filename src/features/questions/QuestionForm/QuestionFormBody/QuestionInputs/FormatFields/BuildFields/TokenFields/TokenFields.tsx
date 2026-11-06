import { FormField } from '../../../FormField/FormField';

export function TokenFields() {
  return (
    <>
      <p>Separe as peças com |. Exemplo: 2 | × | x | + | 4. Use cada peça uma vez em cada ordem.</p>
      <FormField name="tokens" label="Peças disponíveis" />
      <FormField name="expectedTokens" label="Ordem correta das peças" />
    </>
  );
}
