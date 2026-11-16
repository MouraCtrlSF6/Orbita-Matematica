import { useRef } from 'react';

export function useOverlayFocus() {
  const previousFocus = useRef<HTMLElement | null>(null);

  return {
    capture: () => {
      previousFocus.current = document.activeElement as HTMLElement | null;
    },
    restore: (event: Event) => {
      event.preventDefault();
      previousFocus.current?.focus();
    },
  };
}
