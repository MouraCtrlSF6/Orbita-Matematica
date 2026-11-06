import type { KeyboardEvent } from 'react';
import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { Button } from '../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../components/Button/button-styles';
import type { Mission } from '../../../../../game/types';
import type { useQuestionOrder } from '../hooks/useQuestionOrder';

interface QuestionOrderControlsProps {
  mission: Mission;
  previous?: string;
  next?: string;
  order: Omit<ReturnType<typeof useQuestionOrder>, 'listRef'>;
}

export function QuestionOrderControls({
  mission,
  previous,
  next,
  order,
}: QuestionOrderControlsProps) {
  return (
    <Button
      aria-label={`Arrastar ${mission.title} para reordenar`}
      aria-description="Arraste dentro do setor. No teclado, use as teclas para cima e para baixo para mover a questão."
      aria-keyshortcuts="ArrowUp ArrowDown"
      variant={ButtonVariant.Ghost}
      disabled={isUnavailable(order.busy, previous, next)}
      className="size-11 touch-none cursor-grab select-none p-0 active:cursor-grabbing"
      onPointerDown={(event) => order.start(event, mission.id)}
      onPointerMove={order.track}
      onPointerUp={order.finish}
      onPointerCancel={order.cancel}
      onLostPointerCapture={order.cancel}
      onKeyDown={(event) => moveWithKeyboard(event, mission.id, previous, next, order.move)}
    >
      <DragHandleDots2Icon aria-hidden="true" className="size-5" />
    </Button>
  );
}

function moveWithKeyboard(
  event: KeyboardEvent<HTMLButtonElement>,
  id: string,
  previous: string | undefined,
  next: string | undefined,
  move: (id: string, target: string) => Promise<void>,
) {
  const destinations: Record<string, string | undefined> = {
    ArrowUp: previous,
    ArrowDown: next,
  };
  const destination = destinations[event.key];

  if (!destination) return;
  event.preventDefault();
  event.stopPropagation();
  void move(id, destination);
}

function isUnavailable(busy: boolean, previous?: string, next?: string) {
  return busy || (!previous && !next);
}
