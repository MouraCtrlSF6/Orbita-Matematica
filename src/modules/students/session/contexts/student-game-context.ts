import { createContext } from 'react';
import type { GameState } from '../reducer';
import type { StudentNavigation, FlightSession } from '../student-navigation';
import type { StudentRoom } from '../room-sync';

export interface StudentGame {
  state: GameState;
  navigation: StudentNavigation;
  flightSession: FlightSession;
  settingsOpen: boolean;
  storageAvailable: boolean;
  room: StudentRoom;
}

export const StudentGameContext = createContext<StudentGame | null>(null);
