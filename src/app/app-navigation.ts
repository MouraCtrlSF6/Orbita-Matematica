import type { Dispatch, SetStateAction } from 'react';
import { Screen, type GameAction, type GameState } from '../game/reducer';
import type { MissionResult, SavedGame } from '../game/types';
import type { Point } from '../game/space';
import type { MissionActivity } from '../game/room-progress';
export interface FlightSession {
  positions: Map<string, Point>;
  id: number;
}
export class AppNavigation {
  constructor(
    private dispatch: Dispatch<GameAction>,
    private state: GameState,
    private settings: Dispatch<SetStateAction<boolean>>,
    private session: Dispatch<SetStateAction<FlightSession>>,
    readonly recordActivity: (
      sectorId: string,
      missionId: string,
      activity: MissionActivity,
    ) => void,
  ) {}
  map = () => this.dispatch({ type: 'navigate', screen: Screen.Map });
  tutorial = () => this.dispatch({ type: 'navigate', screen: Screen.Tutorial });
  summary = () => this.dispatch({ type: 'navigate', screen: Screen.Summary });
  returnSector = () => this.dispatch({ type: 'return-sector' });
  enterSector = (id: string) => this.dispatch({ type: 'enter-sector', id });
  complete = (result: MissionResult) => this.dispatch({ type: 'complete', result });
  finishTutorial = () => this.dispatch({ type: 'tutorial-done' });
  preference = (key: keyof SavedGame['preferences'], value: boolean) =>
    this.dispatch({ type: 'preference', key, value });
  sound = (value: boolean) => this.preference('soundEnabled', value);
  openSettings = () => this.settings(true);
  closeSettings = () => this.settings(false);
  start = (id: string) => {
    if (!this.state.save.tutorialDone) this.tutorial();
    else this.dispatch({ type: 'start', id });
  };
  reset = () => {
    this.session((session) => ({ positions: new Map(), id: session.id + 1 }));
    this.dispatch({ type: 'reset' });
  };
}
export function isExploration(screen: Screen): boolean {
  return [Screen.Map, Screen.Sector].includes(screen);
}
export function appClassName(state: GameState): string {
  const flags = {
    'app-shell': true,
    'exploration-shell': isExploration(state.screen),
    'large-text': state.save.preferences.largeText,
    'reduce-motion': state.save.preferences.reducedMotion,
  };
  return Object.keys(flags)
    .filter((key) => flags[key as keyof typeof flags])
    .join(' ');
}
