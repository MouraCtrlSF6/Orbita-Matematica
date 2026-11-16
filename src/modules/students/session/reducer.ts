import { missions } from '../../../content/missions';
import { initialSave, isMissionUnlocked, isSectorUnlocked } from '../../../game/progress';
import type { Mission } from '../../../game/types';
import {
  GameActionType,
  Screen,
  type ActionHandlers,
  type ActionOf,
  type GameAction,
  type GameState,
} from './reducer-types';

function navigate(state: GameState, action: ActionOf<GameActionType.Navigate>): GameState {
  return { ...state, screen: action.screen, missionId: null };
}

function enterSector(
  state: GameState,
  action: ActionOf<GameActionType.EnterSector>,
  catalog: Mission[],
): GameState {
  if (!isSectorUnlocked(action.id, state.save.completed, catalog)) return state;
  return { ...state, screen: Screen.Sector, sectorId: action.id, missionId: null };
}

function startMission(
  state: GameState,
  action: ActionOf<GameActionType.Start>,
  catalog: Mission[],
): GameState {
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
  action: ActionOf<GameActionType.Complete>,
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
  { destination }: ActionOf<GameActionType.ResolveRoute>,
  catalog: Mission[],
): GameState {
  const { key, screen, sectorId, missionId } = destination;
  const base = { ...state, validatedVisitKey: key, sectorId: null, missionId: null };
  const fallback = screen === Screen.Summary ? Screen.Summary : Screen.Map;
  const map = navigate(base, { type: GameActionType.Navigate, screen: fallback });

  if (!sectorId) return map;

  const sector = enterSector(map, { type: GameActionType.EnterSector, id: sectorId }, catalog);

  return resolveMission(sector, missionId, catalog);
}

function resolveMission(state: GameState, id: string | undefined, catalog: Mission[]) {
  if (!id || state.screen !== Screen.Sector) return state;

  const mission = catalog.find((item) => item.id === id);

  return mission?.sectorId === state.sectorId
    ? startMission(state, { type: GameActionType.Start, id }, catalog)
    : state;
}

const handlers: ActionHandlers = {
  [GameActionType.ResolveRoute]: resolveRoute,
  [GameActionType.Navigate]: navigate,
  [GameActionType.EnterSector]: enterSector,
  [GameActionType.Start]: startMission,
  [GameActionType.Complete]: completeMission,
  [GameActionType.ReturnSector]: (state) => ({
    ...state,
    screen: state.sectorId ? Screen.Sector : Screen.Map,
    missionId: null,
  }),
  [GameActionType.ToggleSound]: (state) => ({
    ...state,
    save: {
      ...state.save,
      preferences: {
        ...state.save.preferences,
        soundEnabled: !state.save.preferences.soundEnabled,
      },
    },
  }),
  [GameActionType.Preference]: (state, action) => ({
    ...state,
    save: { ...state.save, preferences: { ...state.save.preferences, [action.key]: action.value } },
  }),
  [GameActionType.Reset]: () => ({
    save: initialSave(),
    screen: Screen.Map,
    missionId: null,
    sectorId: null,
  }),
};

export function gameReducer(
  state: GameState,
  action: GameAction,
  catalog: Mission[] = missions,
): GameState {
  const handler = handlers[action.type] as (
    state: GameState,
    action: GameAction,
    catalog: Mission[],
  ) => GameState;

  return handler(state, action, catalog);
}
