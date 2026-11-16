import { useContext } from 'react';
import { StudentGameContext } from '../contexts/student-game-context';

export function useStudentGame() {
  const game = useContext(StudentGameContext);

  if (!game) throw new Error('Game components require a StudentGameProvider.');

  return game;
}
