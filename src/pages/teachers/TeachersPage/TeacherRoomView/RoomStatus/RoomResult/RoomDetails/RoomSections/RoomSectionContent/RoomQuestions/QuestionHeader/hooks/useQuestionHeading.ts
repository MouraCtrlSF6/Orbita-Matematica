import { useLayoutEffect, useRef } from 'react';

export function useQuestionHeading(open: boolean) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousOpen = useRef(open);

  useLayoutEffect(() => {
    if (previousOpen.current === open) return;
    previousOpen.current = open;
    headingRef.current?.focus();
  }, [open]);

  return headingRef;
}
