import { initialSave } from '../game/progress';
import type { SavedGame } from '../game/types';
import { loadGame, saveGame } from './storage';

function writeToBrowser(save: SavedGame): boolean {
  try {
    return saveGame(window.localStorage, save);
  } catch {
    return false;
  }
}
class BrowserGameStorage {
  private available = true;
  private listeners = new Set<() => void>();
  read() {
    try {
      return loadGame(window.localStorage);
    } catch {
      return initialSave();
    }
  }
  write(save: SavedGame) {
    const next = writeToBrowser(save);
    if (next === this.available) return;
    this.available = next;
    this.listeners.forEach((listener) => listener());
  }
  getStatus = () => this.available;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
}
export function createBrowserGameStorage() {
  return new BrowserGameStorage();
}
