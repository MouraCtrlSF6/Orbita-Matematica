import { Circle, Svg } from '@react-pdf/renderer';
import { ringSegments } from './ring-segments';
import { palette } from '../../styles';
import type { DonutEntry } from '../donut-data';
interface DonutRingProps {
  entries: DonutEntry[];
  total: number;
}
export function DonutRing({ entries, total }: DonutRingProps) {
  const segments = ringSegments(entries, total);

  return (
    <Svg viewBox="0 0 100 100" width="100" height="100">
      {segments.map((entry) => {
        const length = entry.length;
        const start = entry.start;

        return (
          <Circle
            key={entry.label}
            cx={50}
            cy={50}
            r={40}
            fill="none"
            stroke={palette[entry.colorIndex]}
            strokeWidth={13}
            strokeDasharray={length >= 251.326 ? undefined : `${length} ${251.327 - length}`}
            transform={`rotate(${-90 + (start / 251.327) * 360} 50 50)`}
          />
        );
      })}
    </Svg>
  );
}
