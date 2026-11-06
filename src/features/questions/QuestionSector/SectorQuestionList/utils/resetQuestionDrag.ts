import type { QuestionDrag } from './question-drag';

export function resetQuestionDrag(drag: QuestionDrag | null) {
  if (drag) drag.element.style.transform = drag.originalTransform;
}
