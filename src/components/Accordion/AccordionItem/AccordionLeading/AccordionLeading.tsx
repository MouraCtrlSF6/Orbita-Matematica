import type { ReactNode } from 'react';

interface AccordionLeadingProps {
  children: ReactNode;
}

export function AccordionLeading({ children }: AccordionLeadingProps) {
  return children && <div className="absolute top-2 -left-12">{children}</div>;
}
