import { useStudentGame } from './hooks/useStudentGame';
import { appClassName } from '../../app/app-navigation';
import { AppSidebar } from '../../app/AppSidebar';
import { AppWorkspace } from '../../app/AppWorkspace';
import { SettingsOverlay } from '../../app/SettingsOverlay';
import { AppContent } from './AppContent';

const skipLink = (
  <a
    className="skip-link fixed -top-25 left-5 [z-index:10] bg-white py-3 px-5 focus:top-3"
    href="#main"
  >
    Pular para o conteúdo
  </a>
);

export function AppShell() {
  const { state } = useStudentGame();

  return (
    <div className={appClassName(state)}>
      {skipLink}
      <AppSidebar />
      <AppWorkspace screen={state.screen}>
        <AppContent />
      </AppWorkspace>
      <SettingsOverlay />
    </div>
  );
}
