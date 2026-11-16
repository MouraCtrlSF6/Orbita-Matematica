import { useStudentGame } from '../../../../session/hooks/useStudentGame';
import { SettingsDialog } from '../../../../settings/SettingsDialog/SettingsDialog';

export function StudentGameSettings() {
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
