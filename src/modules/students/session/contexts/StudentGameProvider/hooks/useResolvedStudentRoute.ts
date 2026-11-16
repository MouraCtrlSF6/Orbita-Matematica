import type { Dispatch } from 'react';
import type { GameAction, GameState } from '../../../reducer';
import { studentDestinationPath } from '../../../student-routes';
import { useStudentDestination } from './useStudentDestination';

export function useResolvedStudentRoute(
  state: GameState,
  dispatch: Dispatch<GameAction>,
  roomPath: string,
) {
  const destination = useStudentDestination();

  if (state.validatedVisitKey !== destination.key) {
    dispatch({ type: 'resolve-route', destination });
    return null;
  }
  if (state.screen !== destination.screen) {
    return studentDestinationPath(roomPath, state.screen, state.sectorId ?? undefined);
  }
  return null;
}
