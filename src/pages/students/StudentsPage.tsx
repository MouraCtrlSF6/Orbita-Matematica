import { useRef, useState } from 'react';
import { useGame } from './hooks/useGame';
import { useSoundShortcut } from './hooks/useSoundShortcut';
import { useMainFocus } from './hooks/useMainFocus';
import { AppNavigation, appClassName, type FlightSession } from '../../app/app-navigation';
import { AppSidebar } from '../../app/AppSidebar';
import { AppWorkspace, PageFooter, StorageWarning } from '../../app/AppLayout';
import { AppScreen, SettingsOverlay, type AppScreenProps } from '../../app/AppScreens';
interface AppContentProps extends AppScreenProps {
  storageAvailable: boolean;
}
function AppContent(props: AppContentProps) {
  const mainRef = useRef<HTMLElement>(null);
  useMainFocus(props.state, mainRef);
  return (
    <main id="main" ref={mainRef} tabIndex={-1}>
      <StorageWarning available={props.storageAvailable} />
      <AppScreen {...props} />
      <PageFooter />
    </main>
  );
}
const skipLink = (
  <a className="skip-link" href="#main">
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
export function StudentsPage() {
  const game = useGame();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [flightSession, setFlightSession] = useState<FlightSession>(() => ({
    positions: new Map(),
    id: 0,
  }));
  useSoundShortcut(game.dispatch);
  const navigation = new AppNavigation(
    game.dispatch,
    game.state,
    setSettingsOpen,
    setFlightSession,
  );
  return (
    <AppShell
      {...game}
      navigation={navigation}
      settingsOpen={settingsOpen}
      flightSession={flightSession}
    />
  );
}
