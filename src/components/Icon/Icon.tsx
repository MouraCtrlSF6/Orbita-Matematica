import { IconName } from '../icon-names';

const paths: Record<IconName, string> = {
  orbit: 'M20 12a8 8 0 1 1-8-8M2 18C0 13 21 0 23 6S4 24 2 18M12 9v6m-3-3h6',
  map: 'm3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2V5Zm6-2v16m6-14v16',
  flag: 'M5 21V3m0 1c5-4 9 4 14 0v10c-5 4-9-4-14 0',
  book: 'M12 5c-3-3-7-3-10-2v16c3-1 7-1 10 2m0-16c3-3 7-3 10-2v16c-3-1-7-1-10 2V5Z',
  settings:
    'm10 2-1 3-3-1-2 3 2 3-1 3-3 1 1 4 4-1 2 3 3-2 3 1 2-3-2-3 1-3 3-1-1-4-4 1-2-3-3 2Zm2 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  star: 'm12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z',
  lock: 'M6 10h12v11H6V10Zm2 0V6a4 4 0 0 1 8 0v4m-4 5v2',
  check: 'm5 12 4 4L19 6',
  sound: 'm11 4-6 5H2v6h3l6 5V4Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',
  bulb: 'M9 19h6m-5 3h4M8 14a7 7 0 1 1 8 0l-1 3H9l-1-3Z',
  back: 'M20 12H4m6-6-6 6 6 6',
  close: 'm6 6 12 12M6 18 18 6',
  rocket:
    'M14 4c3-2 6-2 6-2s0 3-2 6l-7 8-5-5 8-7Zm-7 8-4 1-1 5 6-2m8-7-1 6-5 1m-5 3-3 3m1-6-2 2m7 1-2 2M14 7h.01',
};

export interface IconProps {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 22 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
