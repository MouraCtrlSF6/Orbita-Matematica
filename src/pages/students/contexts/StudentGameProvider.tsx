import { useState, type ReactNode } from 'react';
import { useGame } from '../hooks/useGame';
import { useSoundShortcut } from '../hooks/useSoundShortcut';
import { useRoomProgress } from '../hooks/useRoomProgress';
import type { StudentRoom } from '../room-sync';
import { AppNavigation, type FlightSession } from '../../../app/app-navigation';
import { StudentGameContext } from './student-game-context';

export interface StudentGameProviderProps {
  room: StudentRoom;
  children: ReactNode;
}

export function StudentGameProvider({ room, children }: StudentGameProviderProps) {
  const game = useGame(room.storage);

  const [settingsOpen, setSettingsOpen] = useState(false);

  const [flightSession, setFlightSession] = useState<FlightSession>(() => ({
    positions: new Map(),
    id: 0,
  }));

  useSoundShortcut(game.dispatch);
  useRoomProgress(room, game.state);
  const navigation = new AppNavigation(
    game.dispatch,
    game.state,
    setSettingsOpen,
    setFlightSession,
    room.record,
  );

  const value = {
    state: game.state,
    storageAvailable: game.storageAvailable,
    room,
    navigation,
    settingsOpen,
    flightSession,
  };

  return <StudentGameContext.Provider value={value}>{children}</StudentGameContext.Provider>;
}
