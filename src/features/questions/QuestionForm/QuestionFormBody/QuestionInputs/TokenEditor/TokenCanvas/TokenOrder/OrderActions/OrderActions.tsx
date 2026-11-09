import { TrashIcon } from '@radix-ui/react-icons';
import { ButtonVariant } from '../../../../../../../../../components/Button/button-styles';
import { TooltipButton } from '../../../../../../../../../components/Tooltip/TooltipButton/TooltipButton';
import { MovePieceButton } from './MovePieceButton/MovePieceButton';
import { orderAvailability } from './order-availability';

interface OrderActionsProps {
  selected: number;
  count: number;
  move: (direction: number) => void;
  remove: () => void;
}

export function OrderActions({ selected, count, move, remove }: OrderActionsProps) {
  const available = orderAvailability(selected, count);

  return (
    <div className="flex flex-wrap gap-2">
      <MovePieceButton direction={-1} disabled={!available.left} move={move} />
      <MovePieceButton direction={1} disabled={!available.right} move={move} />
      <TooltipButton
        aria-label="Remover peça selecionada"
        disabled={!available.remove}
        variant={ButtonVariant.Danger}
        onClick={remove}
      >
        <TrashIcon aria-hidden className="size-5" />
      </TooltipButton>
    </div>
  );
}
