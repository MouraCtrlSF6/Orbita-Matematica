import type { ReactNode } from 'react';

interface QuestionPanelProps {
  active: boolean;
  className: string;
  children: ReactNode;
}

export function QuestionPanel({ active, className, children }: QuestionPanelProps) {
  const visibility = active
    ? 'relative visible translate-x-0 [transition:translate_300ms_ease,visibility_0s]'
    : `absolute inset-x-0 top-0 invisible [transition:translate_300ms_ease,visibility_0s_300ms] ${className}`;

  return (
    <div
      inert={!active}
      aria-hidden={!active}
      className={`grid w-full min-w-0 gap-5 ${visibility}`}
    >
      {children}
    </div>
  );
}
