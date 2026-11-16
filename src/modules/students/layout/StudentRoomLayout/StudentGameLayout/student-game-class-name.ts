import type { SavedGame } from '../../../../../game/types';
import type { Screen } from '../../../session/reducer';
import { isExploration } from '../../../session/student-navigation';

export function studentGameClassName(
  screen: Screen,
  preferences: SavedGame['preferences'],
): string {
  const flags = {
    'app-shell flex min-h-[100vh] ds-down-mobile:block': true,
    'exploration-shell bg-space text-space-ink [&_main]:max-w-none [&_main]:pt-7 [&_main]:pr-7 [&_main]:pb-0 [&_main]:pl-7 ds-down-mobile:[&_main]:pt-5.5 ds-down-mobile:[&_main]:pr-3 ds-down-mobile:[&_main]:pb-0 ds-down-mobile:[&_main]:pl-3':
      isExploration(screen),
    'large-text uppercase font-[Arial,Verdana]': preferences.largeText,
    'reduce-motion': preferences.reducedMotion,
  };

  return Object.keys(flags)
    .filter((key) => flags[key as keyof typeof flags])
    .join(' ');
}
