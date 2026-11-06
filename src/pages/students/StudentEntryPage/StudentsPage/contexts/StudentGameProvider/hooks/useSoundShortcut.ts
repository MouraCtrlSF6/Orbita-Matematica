import { useEffect, type Dispatch } from 'react';
import type { GameAction } from '../../../../../../../game/reducer';
function hasModifier(event: KeyboardEvent): boolean {
  return event.ctrlKey || event.altKey || event.metaKey;
}

function isEditing(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    Boolean(
      target.closest(
        'input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"], [role="combobox"]',
      ),
    )
  );
}

function isSoundShortcut(event: KeyboardEvent): boolean {
  return (
    event.key.toLowerCase() === 'm' &&
    !event.repeat &&
    !event.isComposing &&
    !event.defaultPrevented &&
    !hasModifier(event) &&
    !isEditing(event.target)
  );
}

function soundListener(dispatch: Dispatch<GameAction>) {
  return (event: KeyboardEvent) => {
    if (!isSoundShortcut(event)) return;
    event.preventDefault();
    dispatch({ type: 'toggle-sound' });
  };
}

export function useSoundShortcut(dispatch: Dispatch<GameAction>) {
  useEffect(() => {
    const listener = soundListener(dispatch);

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [dispatch]);
}
