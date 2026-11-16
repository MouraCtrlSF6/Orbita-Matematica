import type { Dispatch, SetStateAction } from 'react';
import { Screen, type GameAction } from './reducer';
import type { MissionActivity } from '../../../game/room-progress';
import type { Point } from '../../../game/space';
import type { MissionResult, SavedGame } from '../../../game/types';
export interface FlightSession {
  positions: Map<string, Point>;
  id: number;
}
export class StudentNavigation {
  constructor(
    private dispatch: Dispatch<GameAction>,
    private goTo: (screen: Screen, sectorId?: string, missionId?: string) => void,
    private sectorId: string | null,
    private settings: Dispatch<SetStateAction<boolean>>,
    private session: Dispatch<SetStateAction<FlightSession>>,
    readonly recordActivity: (
      sectorId: string,
      missionId: string,
      activity: MissionActivity,
    ) => void,
  ) {}
  map = () => this.goTo(Screen.Map);
  summary = () => this.goTo(Screen.Summary);
  returnSector = () =>
    this.goTo(this.sectorId ? Screen.Sector : Screen.Map, this.sectorId ?? undefined);
  enterSector = (id: string) => this.goTo(Screen.Sector, id);
  complete = (result: MissionResult) => this.dispatch({ type: 'complete', result });
  preference = (key: keyof SavedGame['preferences'], value: boolean) =>
    this.dispatch({
      type: 'preference',
      key,
      value,
    });
  sound = (value: boolean) => this.preference('soundEnabled', value);
  openSettings = () => this.settings(true);
  closeSettings = () => this.settings(false);
  start = (id: string) => {
    if (this.sectorId) this.goTo(Screen.Mission, this.sectorId, id);
  };
  reset = () => {
    this.session((session) => ({ positions: new Map(), id: session.id + 1 }));
    this.dispatch({ type: 'reset' });
    this.map();
  };
}
export function isExploration(screen: Screen): boolean {
  return [Screen.Map, Screen.Sector].includes(screen);
}
