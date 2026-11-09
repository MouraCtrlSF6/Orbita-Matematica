import { useId, useState } from 'react';

export function useQuestionCreation() {
  const id = useId();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((current) => !current);

  return { id, open, toggle };
}

export type QuestionCreation = ReturnType<typeof useQuestionCreation>;
