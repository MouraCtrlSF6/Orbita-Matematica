import { useEffect, type RefObject } from 'react';
import type { QuestionDrag } from '../utils/question-drag';
import { resetQuestionDrag } from '../utils/resetQuestionDrag';

export function useQuestionDragCancellation(
  sourceId: string | null,
  drag: RefObject<QuestionDrag | null>,
  setSourceId: (id: string | null) => void,
  setTargetId: (id: string | null) => void,
) {
  useEffect(() => {
    if (sourceId) return connectCancellation(drag, setSourceId, setTargetId);
  }, [sourceId, drag, setSourceId, setTargetId]);
}

function connectCancellation(
  drag: RefObject<QuestionDrag | null>,
  setSourceId: (id: string | null) => void,
  setTargetId: (id: string | null) => void,
) {
  const stop = () => stopDrag(drag, setSourceId, setTargetId);
  const escape = (event: KeyboardEvent) => cancelOnEscape(event, stop);

  return listenForCancellation(stop, escape, () => resetQuestionDrag(drag.current));
}

function stopDrag(
  drag: RefObject<QuestionDrag | null>,
  setSourceId: (id: string | null) => void,
  setTargetId: (id: string | null) => void,
) {
  resetQuestionDrag(drag.current);
  drag.current = null;
  setSourceId(null);
  setTargetId(null);
}

function cancelOnEscape(event: KeyboardEvent, stop: () => void) {
  if (event.key === 'Escape') stop();
}

function listenForCancellation(
  stop: () => void,
  escape: (event: KeyboardEvent) => void,
  reset: () => void,
) {
  window.addEventListener('blur', stop);
  window.addEventListener('keydown', escape);
  document.addEventListener('visibilitychange', stop);
  return () => {
    reset();
    window.removeEventListener('blur', stop);
    window.removeEventListener('keydown', escape);
    document.removeEventListener('visibilitychange', stop);
  };
}
