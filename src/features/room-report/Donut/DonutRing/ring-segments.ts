import type { DonutEntry } from '../donut-data';
export function ringSegments(entries: DonutEntry[], total: number) {
  let offset = 0;
  const segments = entries.map((entry, colorIndex) => {
    const length = (entry.value / total) * 251.327;
    const start = offset;
    offset += length;
    return { ...entry, length, start, colorIndex };
  });
  return segments.filter((segment) => segment.length > 0);
}
