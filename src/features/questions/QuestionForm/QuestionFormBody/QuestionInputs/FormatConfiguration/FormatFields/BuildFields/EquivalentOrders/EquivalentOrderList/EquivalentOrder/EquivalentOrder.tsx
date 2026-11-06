import { Button } from '../../../../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../../../../components/Button/button-styles';
import { TokenEditor } from '../../../../../../TokenEditor/TokenEditor';

interface EquivalentOrderProps {
  tokens: string[];
  number: number;
  onRemove: () => void;
}

export function EquivalentOrder({ tokens, number, onRemove }: EquivalentOrderProps) {
  return (
    <div className="grid gap-3 border border-line rounded-control p-3">
      <TokenEditor
        name="equivalentTokens"
        label={'Ordem equivalente ' + number}
        available={tokens}
      />
      <Button variant={ButtonVariant.Danger} onClick={onRemove}>
        Excluir ordem equivalente {number}
      </Button>
    </div>
  );
}
