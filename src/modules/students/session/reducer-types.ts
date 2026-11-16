import type { Mission, MissionResult, SavedGame } from '../../../game/types';

export enum Screen {
  Map = 'map',
  Sector = 'sector',
  Mission = 'mission',
  Summary = 'summary',
}

export interface GameState {
  save: SavedGame;
  screen: Screen;
  missionId: string | null;
  sectorId: string | null;
  validatedVisitKey?: string;
}

export interface RoomDestination {
  key: string;
  screen: Screen;
  sectorId?: string;
  missionId?: string;
}

export enum GameActionType {
  ResolveRoute = 'resolve-route',
  Navigate = 'navigate',
  Start = 'start',
  EnterSector = 'enter-sector',
  ReturnSector = 'return-sector',
  Complete = 'complete',
  Preference = 'preference',
  ToggleSound = 'toggle-sound',
  Reset = 'reset',
}

export type GameAction =
  | { type: GameActionType.ResolveRoute; destination: RoomDestination }
  | { type: GameActionType.Navigate; screen: Screen.Map | Screen.Summary }
  | { type: GameActionType.Start; id: string }
  | { type: GameActionType.EnterSector; id: string }
  | { type: GameActionType.ReturnSector }
  | { type: GameActionType.Complete; result: MissionResult }
  | { type: GameActionType.Preference; key: keyof SavedGame['preferences']; value: boolean }
  | { type: GameActionType.ToggleSound }
  | { type: GameActionType.Reset };

export type ActionOf<T extends GameAction['type']> = Extract<GameAction, { type: T }>;

export type ActionHandlers = {
  [T in GameAction['type']]: (
    state: GameState,
    action: ActionOf<T>,
    catalog: Mission[],
  ) => GameState;
};
