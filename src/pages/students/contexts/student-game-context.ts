import { createContext } from 'react';
import type { GameState } from '../../../game/reducer';
import type { AppNavigation, FlightSession } from '../../../app/app-navigation';
import type { StudentRoom } from '../room-sync';

export interface StudentGame {
  state: GameState;
  navigation: AppNavigation;
  flightSession: FlightSession;
  settingsOpen: boolean;
  storageAvailable: boolean;
  room: StudentRoom;
}

export const StudentGameContext = createContext<StudentGame | null>(null);
