import { SpeakerLoudIcon, SpeakerOffIcon } from '@radix-ui/react-icons';

export interface SoundIconProps {
  enabled: boolean;
}

export function SoundIcon({ enabled }: SoundIconProps) {
  const Component = enabled ? SpeakerLoudIcon : SpeakerOffIcon;

  return <Component width={20} height={20} aria-hidden="true" focusable="false" />;
}
