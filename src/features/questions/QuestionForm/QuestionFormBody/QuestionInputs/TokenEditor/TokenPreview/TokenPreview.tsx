import { Button } from '../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../components/Button/button-styles';

interface TokenPreviewProps {
  formula: string;
  count: number;
  onClear: () => void;
}

export function TokenPreview({ formula, count, onClear }: TokenPreviewProps) {
  return (
    <>
      <p
        className="rounded-control bg-selected p-3 m-0 text-primary-hover font-semibold"
        aria-live="polite"
      >
        Prévia: {formula || 'Adicione as peças da expressão.'}
      </p>
      <Button variant={ButtonVariant.Text} disabled={!count} onClick={onClear}>
        Limpar expressão
      </Button>
    </>
  );
}
