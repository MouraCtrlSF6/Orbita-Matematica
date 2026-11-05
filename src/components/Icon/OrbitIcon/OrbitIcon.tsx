import type { ComponentProps } from 'react';

export function OrbitIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 12a8 8 0 1 1-8-8M2 18C0 13 21 0 23 6S4 24 2 18M12 9v6m-3-3h6" />
    </svg>
  );
}
