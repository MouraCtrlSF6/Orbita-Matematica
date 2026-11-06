import { Button } from '../../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../../components/Button/button-styles';
import { TrashIcon } from '@radix-ui/react-icons';
import { orderAvailability } from './order-availability';
import { MovePieceButton } from './MovePieceButton/MovePieceButton';

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
      <Button
        aria-label="Remover peça selecionada"
        disabled={!available.remove}
        variant={ButtonVariant.Danger}
        onClick={remove}
      >
        <TrashIcon aria-hidden />
      </Button>
    </div>
  );
}
