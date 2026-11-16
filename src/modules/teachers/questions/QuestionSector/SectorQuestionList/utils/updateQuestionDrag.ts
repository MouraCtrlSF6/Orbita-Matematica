import type { QuestionDrag } from './question-drag';

export function updateQuestionDrag(list: HTMLDivElement, drag: QuestionDrag, x: number, y: number) {
  const bounds = list.getBoundingClientRect();
  const desired = y - bounds.top - drag.grabOffset - drag.originalTop;
  const maximum = Math.max(0, bounds.height - drag.originalTop - drag.height);
  const offset = Math.max(-drag.originalTop, Math.min(maximum, desired));

  drag.moved ||= Math.hypot(x - drag.startX, y - drag.startY) > 6;
  drag.element.style.transform = `translate3d(0, ${offset}px, 0)`;
}
