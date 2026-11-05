export interface SoundWavesProps {
  enabled: boolean;
}

export function SoundWaves({ enabled }: SoundWavesProps) {
  if (!enabled) return <path d="m16 9 6 6m0-6-6 6" />;
  return <path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" />;
}
