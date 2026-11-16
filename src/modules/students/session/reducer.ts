import { missions } from '../../../content/missions';
import { initialSave, isMissionUnlocked, isSectorUnlocked } from '../../../game/progress';
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

export type GameAction =
  | { type: 'resolve-route'; destination: RoomDestination }
  | { type: 'navigate'; screen: Screen.Map | Screen.Summary }
  | { type: 'start'; id: string }
  | { type: 'enter-sector'; id: string }
  | { type: 'return-sector' }
  | { type: 'complete'; result: MissionResult }
  | { type: 'preference'; key: keyof SavedGame['preferences']; value: boolean }
  | { type: 'toggle-sound' }
  | { type: 'reset' };

type ActionOf<T extends GameAction['type']> = Extract<GameAction, { type: T }>;

type ActionHandlers = {
  [T in GameAction['type']]: (
    state: GameState,
    action: ActionOf<T>,
    catalog: Mission[],
  ) => GameState;
};

function navigate(state: GameState, action: ActionOf<'navigate'>): GameState {
  return { ...state, screen: action.screen, missionId: null };
}

function enterSector(
  state: GameState,
  action: ActionOf<'enter-sector'>,
  catalog: Mission[],
): GameState {
  if (!isSectorUnlocked(action.id, state.save.completed, catalog)) return state;
  return { ...state, screen: Screen.Sector, sectorId: action.id, missionId: null };
}

function startMission(state: GameState, action: ActionOf<'start'>, catalog: Mission[]): GameState {
  const mission = catalog.find((item) => item.id === action.id);

  if (!mission || !isMissionUnlocked(action.id, state.save.completed, catalog)) return state;

  return {
    ...state,
    screen: Screen.Mission,
    missionId: action.id,
    sectorId: mission.sectorId,
    save: { ...state.save, lastMissionId: action.id },
  };
}
function completeMission(
  state: GameState,
  action: ActionOf<'complete'>,
  catalog: Mission[],
): GameState {
  if (!state.missionId || !isMissionUnlocked(state.missionId, state.save.completed, catalog))
    return state;

  const completed = { ...state.save.completed, [state.missionId]: action.result };

  const next = catalog.find((mission) => !completed[mission.id]);

  return { ...state, save: { ...state.save, completed, lastMissionId: next?.id ?? null } };
}
function resolveRoute(
  state: GameState,
  { destination }: ActionOf<'resolve-route'>,
  catalog: Mission[],
): GameState {
  const { key, screen, sectorId, missionId } = destination;
  const base = { ...state, validatedVisitKey: key, sectorId: null, missionId: null };
  const fallback = screen === Screen.Summary ? Screen.Summary : Screen.Map;
  const map = navigate(base, { type: 'navigate', screen: fallback });

  if (!sectorId) return map;

  const sector = enterSector(map, { type: 'enter-sector', id: sectorId }, catalog);

  return resolveMission(sector, missionId, catalog);
}

function resolveMission(state: GameState, id: string | undefined, catalog: Mission[]) {
  if (!id || state.screen !== Screen.Sector) return state;

  const mission = catalog.find((item) => item.id === id);

  return mission?.sectorId === state.sectorId
    ? startMission(state, { type: 'start', id }, catalog)
    : state;
}

const handlers: ActionHandlers = {
  'resolve-route': resolveRoute,
  navigate,
  'enter-sector': enterSector,
  start: startMission,
  complete: completeMission,
  'return-sector': (state) => ({
    ...state,
    screen: state.sectorId ? Screen.Sector : Screen.Map,
    missionId: null,
  }),
  'toggle-sound': (state) => ({
    ...state,
    save: {
      ...state.save,
      preferences: {
        ...state.save.preferences,
        soundEnabled: !state.save.preferences.soundEnabled,
      },
    },
  }),
  preference: (state, action) => ({
    ...state,
    save: { ...state.save, preferences: { ...state.save.preferences, [action.key]: action.value } },
  }),
  reset: () => ({ save: initialSave(), screen: Screen.Map, missionId: null, sectorId: null }),
};

export function gameReducer(
  state: GameState,
  action: GameAction,
  catalog: Mission[] = missions,
): GameState {
  // The mapped handler table enforces every action's payload; indexing preserves that pair at runtime.
  const handler = handlers[action.type] as (
    state: GameState,
    action: GameAction,
    catalog: Mission[],
  ) => GameState;

  return handler(state, action, catalog);
}
