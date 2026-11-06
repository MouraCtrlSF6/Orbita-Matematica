import { Button } from '../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../components/Button/button-styles';

interface TokenPaletteProps {
  tokens: string[];
  onAdd: (token: string) => void;
}

export function TokenPalette({ tokens, onAdd }: TokenPaletteProps) {
  return (
    <div className="flex flex-wrap gap-2" aria-label="Banco de peças">
      {tokens.map((token, index) => (
        <Button
          key={index}
          variant={ButtonVariant.Secondary}
          draggable
          onDragStart={(event) => event.dataTransfer.setData('text/plain', token)}
          aria-label={'Adicionar peça ' + token}
          onClick={() => onAdd(token)}
        >
          {token}
        </Button>
      ))}
    </div>
  );
}
