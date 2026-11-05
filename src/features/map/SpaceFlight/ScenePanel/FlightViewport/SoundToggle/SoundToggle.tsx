import { type FlightViewProps } from '../../../flight-scene-types';
import { SoundIcon } from './SoundIcon/SoundIcon';

function soundTitle(enabled: boolean): string {
  return enabled ? 'Desligar som (M)' : 'Ligar som (M)';
}

interface SoundToggleProps {
  controller: FlightViewProps['controller'];
  paused?: FlightViewProps['paused'];
  soundEnabled: FlightViewProps['soundEnabled'];
  onSoundChange?: FlightViewProps['onSoundChange'];
}

export function SoundToggle({ controller, soundEnabled, onSoundChange, paused }: SoundToggleProps) {
  const title = soundTitle(soundEnabled);

  return (
    <button
      type="button"
      className="flight-sound-toggle absolute right-3.5 bottom-3.5 inline-flex items-center gap-2 min-h-11 py-2.5 px-3.5 [border:1px_solid_#8ce7d0] rounded-soft [background:#102e32] text-[#c8ffee] text-small font-semibold [&[aria-pressed='false']]:[border-color:#7586a4] [&[aria-pressed='false']]:[background:#17233d] [&[aria-pressed='false']]:text-flight-secondary-ink ds-hover:[background:#26445a] [&_kbd]:[border:1px_solid_currentColor] [&_kbd]:rounded-xs [&_kbd]:py-[0.0625rem] [&_kbd]:px-1 [&_kbd]:text-caption"
      aria-label="Som da nave"
      aria-pressed={soundEnabled}
      aria-keyshortcuts="m"
      title={title}
      disabled={paused}
      onClick={() => {
        controller.stop();
        onSoundChange?.(!soundEnabled);
      }}
    >
      <SoundIcon enabled={soundEnabled} />
      {soundEnabled ? 'Som ligado' : 'Som desligado'}
      <kbd>M</kbd>
    </button>
  );
}
