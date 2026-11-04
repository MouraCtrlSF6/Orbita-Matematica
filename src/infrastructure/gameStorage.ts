import { initialSave } from '../game/progress';
import type { SavedGame } from '../game/types';
import { loadGame, saveGame, STORAGE_KEY } from './storage';

export function roomSaveKey(roomId: string) {
  return `${STORAGE_KEY}:room:${roomId}`;
}

function writeToBrowser(key: string, save: SavedGame): boolean {
  try {
    return saveGame(window.sessionStorage, save, key);
  } catch {
    return false;
  }
}
class BrowserGameStorage {
  private available = true;
  private listeners = new Set<() => void>();
  private currentSave?: SavedGame;
  constructor(private key: string) {}
  read() {
    if (this.currentSave) return this.currentSave;
    try {
      return loadGame(window.sessionStorage, this.key);
    } catch {
      return initialSave();
    }
  }
  write(save: SavedGame) {
    this.currentSave = save;
    const next = writeToBrowser(this.key, save);
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
export function createBrowserGameStorage(roomId: string) {
  return new BrowserGameStorage(roomSaveKey(roomId));
}

export type RoomGameStorage = ReturnType<typeof createBrowserGameStorage>;
