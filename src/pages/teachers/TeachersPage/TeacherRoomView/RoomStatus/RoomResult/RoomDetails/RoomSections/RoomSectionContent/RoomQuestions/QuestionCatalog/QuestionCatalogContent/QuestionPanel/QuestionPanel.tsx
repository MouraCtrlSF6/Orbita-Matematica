import type { ReactNode } from 'react';

interface QuestionPanelProps {
  active: boolean;
  className: string;
  children: ReactNode;
}

export function QuestionPanel({ active, className, children }: QuestionPanelProps) {
  const position = active ? 'relative' : 'absolute inset-x-0 top-0';

  return (
    <div
      inert={!active}
      aria-hidden={!active}
      className={`grid w-full min-w-0 gap-5 ${position} ${className}`}
    >
      {children}
    </div>
  );
}
