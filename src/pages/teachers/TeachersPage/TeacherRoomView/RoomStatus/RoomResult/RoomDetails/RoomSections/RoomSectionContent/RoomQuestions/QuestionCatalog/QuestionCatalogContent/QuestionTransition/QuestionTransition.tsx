import type { ReactNode } from 'react';

interface QuestionTransitionProps {
  open: boolean;
  children: ReactNode;
}

export function QuestionTransition({ open, children }: QuestionTransitionProps) {
  const position = open ? '-translate-x-full' : 'translate-x-0';

  return (
    <div data-question-viewport className="relative overflow-x-clip">
      <div
        className={`relative w-full transition-transform duration-[450ms] ease-in-out ds-reduced-motion:transition-none ${position}`}
      >
        {children}
      </div>
    </div>
  );
}
