import { useMissionCatalog } from '../../../../../hooks/useMissionCatalog';
import { useEffect, useReducer, useSyncExternalStore } from 'react';
import { gameReducer, Screen, type GameState } from '../../../../../../../game/reducer';
import type { RoomGameStorage } from '../../../../../../../infrastructure/gameStorage';

export function useGame(repository: RoomGameStorage) {
  const catalog = useMissionCatalog();

  const [state, dispatch] = useReducer(
    (state, action) => gameReducer(state, action, catalog),
    undefined,
    (): GameState => ({
      save: repository.read(),
      screen: Screen.Map,
      missionId: null,
      sectorId: null,
    }),
  );

  const storageAvailable = useSyncExternalStore(repository.subscribe, repository.getStatus);

  useEffect(() => {
    repository.write(state.save);
  }, [repository, state.save]);
  return {
    state,
    dispatch,
    storageAvailable,
  };
}
