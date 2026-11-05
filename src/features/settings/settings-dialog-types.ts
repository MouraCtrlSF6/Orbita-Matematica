import type { SavedGame } from '../../game/types';

export interface SettingsDialogProps {
  preferences: SavedGame['preferences'];
  onPreference: (key: keyof SavedGame['preferences'], value: boolean) => void;
  onReset: () => void;
  onClose: () => void;
}

export interface PreferenceDefinition {
  key: keyof SavedGame['preferences'];
  title: string;
  description: string;
}

export interface ResetButtonsProps {
  onReset: () => void;
  onClose: () => void;
  onCancel: () => void;
}
