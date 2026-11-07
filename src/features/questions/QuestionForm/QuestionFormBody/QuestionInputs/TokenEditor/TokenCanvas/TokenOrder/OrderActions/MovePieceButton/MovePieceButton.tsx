import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { TooltipButton } from '../../../../../../../../../../components/Tooltip/TooltipButton/TooltipButton';

interface MovePieceButtonProps {
  direction: number;
  disabled: boolean;
  move: (direction: number) => void;
}

const directionIcons: Record<number, typeof ArrowLeftIcon> = {
  [-1]: ArrowLeftIcon,
  1: ArrowRightIcon,
};

export function MovePieceButton({ direction, disabled, move }: MovePieceButtonProps) {
  const label = direction < 0 ? 'Mover peça para a esquerda' : 'Mover peça para a direita';

  const DirectionIcon = directionIcons[direction];

  return (
    <TooltipButton aria-label={label} disabled={disabled} onClick={() => move(direction)}>
      <DirectionIcon aria-hidden="true" className="size-5" />
    </TooltipButton>
  );
}
