import { useRef, useState } from 'react';
import { useGame } from './hooks/useGame';
import { useSoundShortcut } from './hooks/useSoundShortcut';
import { useMainFocus } from './hooks/useMainFocus';
import { useRoomProgress } from './hooks/useRoomProgress';
import { RoomSyncStatus } from './RoomSyncStatus';
import type { StudentRoom } from './room-sync';
import { AppNavigation, appClassName, type FlightSession } from '../../app/app-navigation';
import { AppSidebar } from '../../app/AppSidebar';
import { AppWorkspace, PageFooter, StorageWarning } from '../../app/AppLayout';
import { AppScreen, SettingsOverlay, type AppScreenProps } from '../../app/AppScreens';
interface AppContentProps extends AppScreenProps {
  storageAvailable: boolean;
  room: StudentRoom;
}
function AppContent(props: AppContentProps) {
  const mainRef = useRef<HTMLElement>(null);
  useMainFocus(props.state, mainRef);
  return (
    <main id="main" ref={mainRef} tabIndex={-1}>
      <StorageWarning available={props.storageAvailable} />
      <RoomSyncStatus room={props.room} />
      <AppScreen {...props} />
      <PageFooter />
    </main>
  );
}
const skipLink = (
  <a
    className="skip-link fixed -top-25 left-5 [z-index:10] bg-white py-3 px-5 focus:top-3"
    href="#main"
  >
    Pular para o conteúdo
  </a>
);
function AppShell(props: AppContentProps) {
  return (
    <div className={appClassName(props.state)}>
      {skipLink}
      <AppSidebar state={props.state} navigation={props.navigation} />
      <AppWorkspace screen={props.state.screen}>
        <AppContent {...props} />
      </AppWorkspace>
      <SettingsOverlay {...props} />
    </div>
  );
}
export function StudentsPage({ room }: { room: StudentRoom }) {
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
  return (
    <AppShell
      {...game}
      room={room}
      navigation={navigation}
      settingsOpen={settingsOpen}
      flightSession={flightSession}
    />
  );
}
