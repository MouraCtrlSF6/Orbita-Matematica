import { Button } from '../../../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../../../components/Button/button-styles';

interface SelectedPieceProps {
  token: string;
  index: number;
  selected: boolean;
  onSelect: (index: number) => void;
}

export function SelectedPiece({ token, index, selected, onSelect }: SelectedPieceProps) {
  return (
    <Button
      aria-label={'Selecionar peça ' + (index + 1) + ': ' + token}
      aria-pressed={selected}
      variant={selected ? ButtonVariant.Primary : ButtonVariant.Secondary}
      onClick={() => onSelect(index)}
    >
      {token}
    </Button>
  );
}
