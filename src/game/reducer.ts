import { missions, missionById } from '../content/missions';
import { initialSave, isMissionUnlocked, isSectorUnlocked } from './progress';
import type { MissionResult, SavedGame } from './types';

export enum Screen {
  Map = 'map',
  Sector = 'sector',
  Tutorial = 'tutorial',
  Mission = 'mission',
  Summary = 'summary',
}

export interface GameState {
  save: SavedGame;
  screen: Screen;
  missionId: string | null;
  sectorId: string | null;
}

export type GameAction =
  | { type: 'navigate'; screen: Screen.Map | Screen.Tutorial | Screen.Summary }
  | { type: 'start'; id: string }
  | { type: 'enter-sector'; id: string }
  | { type: 'return-sector' }
  | { type: 'complete'; result: MissionResult }
  | { type: 'tutorial-done' }
  | { type: 'preference'; key: keyof SavedGame['preferences']; value: boolean }
  | { type: 'reset' };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'navigate':
      return { ...state, screen: action.screen, missionId: null };
    case 'enter-sector':
      if (!state.save.tutorialDone || !isSectorUnlocked(action.id, state.save.completed))
        return state;
      return { ...state, screen: Screen.Sector, sectorId: action.id, missionId: null };
    case 'return-sector':
      return { ...state, screen: state.sectorId ? Screen.Sector : Screen.Map, missionId: null };
    case 'start':
      if (!missionById.has(action.id) || !isMissionUnlocked(action.id, state.save.completed))
        return state;
      return {
        ...state,
        screen: Screen.Mission,
        missionId: action.id,
        sectorId: missionById.get(action.id)!.sectorId,
        save: { ...state.save, lastMissionId: action.id },
      };
    case 'complete': {
      if (!state.missionId || !isMissionUnlocked(state.missionId, state.save.completed))
        return state;
      const completed = { ...state.save.completed, [state.missionId]: action.result };
      const next = missions.find((mission) => !completed[mission.id]);
      return { ...state, save: { ...state.save, completed, lastMissionId: next?.id ?? null } };
    }
    case 'tutorial-done':
      return { ...state, screen: Screen.Map, save: { ...state.save, tutorialDone: true } };
    case 'preference':
      return {
        ...state,
        save: {
          ...state.save,
          preferences: { ...state.save.preferences, [action.key]: action.value },
        },
      };
    case 'reset':
      return { save: initialSave(), screen: Screen.Map, missionId: null, sectorId: null };
  }
}
