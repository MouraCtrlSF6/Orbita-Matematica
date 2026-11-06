import { useState } from 'react';
import { FormSection } from '../../../FormSection/FormSection';
import { TokenEditor } from '../../../TokenEditor/TokenEditor';
import { AvailablePieces } from './AvailablePieces/AvailablePieces';
import { EquivalentOrders } from './EquivalentOrders/EquivalentOrders';

export function BuildFields() {
  const [tokens, setTokens] = useState<string[]>([]);

  return (
    <FormSection title="Montagem de expressão" defaultOpen>
      <AvailablePieces tokens={tokens} onChange={setTokens} />
      <TokenEditor name="expectedTokens" label="Ordem correta das peças" available={tokens} />
      <EquivalentOrders tokens={tokens} />
    </FormSection>
  );
}
