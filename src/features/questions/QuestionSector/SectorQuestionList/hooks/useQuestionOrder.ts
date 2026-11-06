import { useQuestionDragCancellation } from './useQuestionDragCancellation';
import { useQuestionOrderSave } from './useQuestionOrderSave';
import { useRef, useState, type RefObject, type PointerEvent } from 'react';
import { findDropTarget } from '../utils/findDropTarget';
import { createQuestionDrag } from '../utils/createQuestionDrag';
import { updateQuestionDrag } from '../utils/updateQuestionDrag';
import { resetQuestionDrag } from '../utils/resetQuestionDrag';
import type { QuestionDrag } from '../utils/question-drag';

export function useQuestionOrder(
  reorder: (id: string, targetId: string) => Promise<boolean>,
  pending: boolean,
) {
  const listRef = useRef<HTMLDivElement>(null);
  const drag = useRef<QuestionDrag | null>(null);
  const [sourceId, setSourceId] = useState<string | null>(null);
  const [targetId, setTargetId] = useState<string | null>(null);
  const save = useQuestionOrderSave(reorder, pending);

  const context = { listRef, drag, setSourceId, setTargetId, save };

  useQuestionDragCancellation(sourceId, drag, setSourceId, setTargetId);

  return {
    listRef,
    sourceId,
    targetId,
    ...save,
    start: (event: PointerEvent<HTMLButtonElement>, id: string) => startDrag(context, event, id),
    track: (event: PointerEvent<HTMLButtonElement>) => trackDrag(context, event),
    finish: () => finishDrag(context),
    cancel: () => cancelDrag(context),
  };
}

type DragContext = {
  listRef: RefObject<HTMLDivElement | null>;
  drag: RefObject<QuestionDrag | null>;
  setSourceId: (id: string | null) => void;
  setTargetId: (id: string | null) => void;
  save: ReturnType<typeof useQuestionOrderSave>;
};

function cancelDrag({ drag, setSourceId, setTargetId }: DragContext) {
  resetQuestionDrag(drag.current);
  drag.current = null;
  setSourceId(null);
  setTargetId(null);
}

function startDrag(context: DragContext, event: PointerEvent<HTMLButtonElement>, id: string) {
  const { listRef, drag, setSourceId, save } = context;
  if (!canStartDrag(save.busy, event)) return;
  const list = listRef.current;
  const element = event.currentTarget.closest<HTMLElement>('[data-accordion-value]');

  if (!list || !element) return;
  event.preventDefault();
  event.currentTarget.focus();
  event.currentTarget.setPointerCapture(event.pointerId);
  drag.current = createQuestionDrag(list, element, id, event.clientX, event.clientY);
  setSourceId(id);
}

function trackDrag(
  { drag, listRef, setTargetId }: DragContext,
  event: PointerEvent<HTMLButtonElement>,
) {
  const active = drag.current;

  const list = listRef.current;

  if (!active || !list) return;
  updateQuestionDrag(list, active, event.clientX, event.clientY);
  active.targetId = findDropTarget(list, active.slots, event.clientX, event.clientY);
  setTargetId(active.targetId);
  if (event.clientY < 48) window.scrollBy(0, -18);
  if (event.clientY > window.innerHeight - 48) window.scrollBy(0, 18);
}

function finishDrag(context: DragContext) {
  const { drag, save } = context;
  const active = drag.current;

  cancelDrag(context);
  if (active?.moved && active.targetId) void save.move(active.id, active.targetId);
}

function canStartDrag(busy: boolean, event: PointerEvent<HTMLButtonElement>) {
  return !busy && event.isPrimary && event.button === 0;
}
