import { useEffect, useRef, type RefObject } from 'react';
import type { GameState } from '../../../../../../../game/reducer';
function focusPage(main: HTMLElement | null) {
  const flight = main?.querySelector<HTMLElement>('.flight-viewport');

  (flight ?? main)?.focus();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

export function useMainFocus(state: GameState, main: RefObject<HTMLElement | null>) {
  const page = `${state.screen}:${state.missionId}`;

  const previous = useRef(page);

  useEffect(() => {
    if (previous.current === page) return;
    previous.current = page;
    focusPage(main.current);
  }, [page, main]);
}
