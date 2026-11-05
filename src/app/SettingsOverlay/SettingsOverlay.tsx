import { useStudentGame } from '../../pages/students/hooks/useStudentGame';
import { SettingsDialog } from '../../features/settings/SettingsDialog/SettingsDialog';

export function SettingsOverlay() {
  const { state, navigation, settingsOpen } = useStudentGame();

  if (!settingsOpen) return null;
  return (
    <SettingsDialog
      preferences={state.save.preferences}
      onPreference={navigation.preference}
      onReset={navigation.reset}
      onClose={navigation.closeSettings}
    />
  );
}
