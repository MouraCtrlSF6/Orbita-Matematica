import type { QuestionDrag } from './question-drag';

export function createQuestionDrag(
  list: HTMLDivElement,
  element: HTMLElement,
  id: string,
  x: number,
  y: number,
): QuestionDrag {
  const bounds = list.getBoundingClientRect();
  const origin = element.getBoundingClientRect();
  const slots = Array.from(list.children, (child) => {
    const item = child as HTMLElement;
    const rect = item.getBoundingClientRect();

    return {
      id: item.dataset.accordionValue ?? '',
      top: rect.top - bounds.top,
      bottom: rect.bottom - bounds.top,
    };
  });

  return {
    id,
    targetId: id,
    startX: x,
    startY: y,
    grabOffset: y - origin.top,
    originalTop: origin.top - bounds.top,
    height: origin.height,
    element,
    originalTransform: element.style.transform,
    slots,
    moved: false,
  };
}
