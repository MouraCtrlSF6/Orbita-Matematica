import { useState, type ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { studentDestinationPath } from '../../student-routes';
import { useResolvedStudentRoute } from './hooks/useResolvedStudentRoute';
import { StudentNavigation, type FlightSession } from '../../student-navigation';
import { StudentGameContext, type StudentGame } from '../student-game-context';
import type { StudentRoom } from '../../room-sync';
import { useGame } from './hooks/useGame';
import { useRoomProgress } from './hooks/useRoomProgress';
import { useSoundShortcut } from './hooks/useSoundShortcut';

export interface StudentGameProviderProps {
  room: StudentRoom;
  children: ReactNode;
  roomPath: string;
}

export function StudentGameProvider({ room, children, roomPath }: StudentGameProviderProps) {
  const game = useGame(room.storage);
  const redirect = useResolvedStudentRoute(game.state, game.dispatch, roomPath);
  const navigate = useNavigate();

  const [settingsOpen, setSettingsOpen] = useState(false);

  const [flightSession, setFlightSession] = useState<FlightSession>(() => ({
    positions: new Map(),
    id: 0,
  }));

  useSoundShortcut(game.dispatch);
  useRoomProgress(room, game.state);

  const navigation = new StudentNavigation(
    game.dispatch,
    (screen, sector, mission) =>
      void navigate(studentDestinationPath(roomPath, screen, sector, mission)),
    game.state.sectorId,
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

  return studentGameContent(redirect, value, children);
}

function studentGameContent(redirect: string | null, value: StudentGame, children: ReactNode) {
  if (redirect) return <Navigate replace to={redirect} />;
  return <StudentGameContext value={value}>{children}</StudentGameContext>;
}
