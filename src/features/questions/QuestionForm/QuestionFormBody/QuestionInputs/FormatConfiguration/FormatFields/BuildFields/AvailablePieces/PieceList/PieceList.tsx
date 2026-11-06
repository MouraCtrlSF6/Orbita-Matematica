import { TrashIcon } from '@radix-ui/react-icons';
import { TooltipButton } from '../../../../../../../../../../components/Tooltip/TooltipButton/TooltipButton';
import { ButtonVariant } from '../../../../../../../../../../components/Button/button-styles';

interface PieceListProps {
  tokens: string[];
  onRemove: (index: number) => void;
}

export function PieceList({ tokens, onRemove }: PieceListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tokens.map((token, index) => (
        <TooltipButton
          key={index}
          variant={ButtonVariant.Secondary}
          className="group hover:bg-ink hover:text-white ds-reduced-motion:transition-none"
          aria-label={'Excluir peça disponível ' + (index + 1) + ': ' + token}
          onClick={() => onRemove(index)}
        >
          {token}
          <TrashIcon className="text-danger" aria-hidden />
        </TooltipButton>
      ))}
    </div>
  );
}
