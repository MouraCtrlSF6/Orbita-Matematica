import type { Dispatch } from 'react';
import { GameActionType, type GameAction, type GameState } from '../../../reducer-types';
import { studentDestinationPath } from '../../../student-routes';
import { useStudentDestination } from './useStudentDestination';

export function useResolvedStudentRoute(
  state: GameState,
  dispatch: Dispatch<GameAction>,
  roomPath: string,
) {
  const destination = useStudentDestination();

  if (state.validatedVisitKey !== destination.key) {
    dispatch({ type: GameActionType.ResolveRoute, destination });
    return null;
  }
  if (state.screen !== destination.screen) {
    return studentDestinationPath(roomPath, state.screen, state.sectorId ?? undefined);
  }
  return null;
}
