import { TooltipButton } from '../../../../../../../../../../components/Tooltip/TooltipButton/TooltipButton';

interface MovePieceButtonProps {
  direction: number;
  disabled: boolean;
  move: (direction: number) => void;
}

export function MovePieceButton({ direction, disabled, move }: MovePieceButtonProps) {
  const label = direction < 0 ? 'Mover peça para a esquerda' : 'Mover peça para a direita';

  return (
    <TooltipButton aria-label={label} disabled={disabled} onClick={() => move(direction)}>
      {direction < 0 ? '←' : '→'}
    </TooltipButton>
  );
}
