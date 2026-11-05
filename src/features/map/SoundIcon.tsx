import { SoundWaves } from './SoundWaves';

export interface SoundIconProps {
  enabled: boolean;
}

export function SoundIcon({ enabled }: SoundIconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H3v6h3l5 4Z" />
      <SoundWaves enabled={enabled} />
    </svg>
  );
}
