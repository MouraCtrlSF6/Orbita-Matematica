import { initialSave } from '../game/progress';
import type { SavedGame } from '../game/types';
import { loadGame, saveGame } from './storage';

export function createBrowserGameStorage() {
  let available = true;
  const listeners = new Set<() => void>();
  return {
    read() {
      try {
        return loadGame(window.localStorage);
      } catch {
        return initialSave();
      }
    },
    write(save: SavedGame) {
      let next: boolean;
      try {
        next = saveGame(window.localStorage, save);
      } catch {
        next = false;
      }
      if (next !== available) {
        available = next;
        listeners.forEach((listener) => listener());
      }
    },
    getStatus: () => available,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
