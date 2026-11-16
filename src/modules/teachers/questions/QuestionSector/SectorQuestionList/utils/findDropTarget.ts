import type { QuestionSlot } from './question-drag';

export function findDropTarget(
  list: HTMLDivElement,
  slots: QuestionSlot[],
  x: number,
  y: number,
): string | null {
  const bounds = list.getBoundingClientRect();

  if (isOutside(bounds, x, y)) return null;
  const relativeY = y - bounds.top;
  const containing = slots.find((slot) => relativeY >= slot.top && relativeY <= slot.bottom);

  return slotId(containing ?? nearestSlot(slots, relativeY));
}

function nearestSlot(slots: QuestionSlot[], relativeY: number) {
  return slots.reduce<QuestionSlot | undefined>((closest, slot) => {
    return distanceTo(slot, relativeY) < distanceTo(closest, relativeY) ? slot : closest;
  }, undefined);
}

function distanceTo(slot: QuestionSlot | undefined, y: number) {
  return slot ? Math.abs((slot.top + slot.bottom) / 2 - y) : Infinity;
}

function isOutside(bounds: DOMRect, x: number, y: number) {
  return x < bounds.left || x > bounds.right || y < bounds.top || y > bounds.bottom;
}

function slotId(slot: QuestionSlot | undefined) {
  return slot?.id ?? null;
}
