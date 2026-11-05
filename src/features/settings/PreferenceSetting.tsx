import type { SavedGame } from '../../game/types';
import { type PreferenceDefinition, type SettingsDialogProps } from './settings-dialog-types';
import { SettingRow } from './SettingRow';

export interface PreferenceSettingProps {
  definition: PreferenceDefinition;
  preferences: SavedGame['preferences'];
  onPreference: SettingsDialogProps['onPreference'];
}

export function PreferenceSetting({
  definition,
  preferences,
  onPreference,
}: PreferenceSettingProps) {
  return (
    <SettingRow
      title={definition.title}
      description={definition.description}
      checked={preferences[definition.key]}
      onChange={(event) => onPreference(definition.key, event.target.checked)}
    />
  );
}
