import { useEffect, useReducer, useSyncExternalStore } from 'react';
import { gameReducer, Screen } from '../../../game/reducer';
import type { RoomGameStorage } from '../../../infrastructure/gameStorage';

export function useGame(repository: RoomGameStorage) {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => ({
    save: repository.read(),
    screen: Screen.Map,
    missionId: null,
    sectorId: null,
  }));
  const storageAvailable = useSyncExternalStore(repository.subscribe, repository.getStatus);
  useEffect(() => {
    repository.write(state.save);
  }, [repository, state.save]);
  return { state, dispatch, storageAvailable };
}
