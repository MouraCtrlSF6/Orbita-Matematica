import { expect, it } from 'vitest';
import { ringSegments } from './ring-segments';
it('omits zero-length arcs and keeps original category colors at 0 and 100 percent', () => {
  const result = ringSegments(
    [
      { label: 'Correct', value: 0 },
      { label: 'Incorrect', value: 5 },
    ],
    5,
  );
  expect(result).toHaveLength(1);
  expect(result[0]).toMatchObject({ length: 251.327, colorIndex: 1 });
  expect(ringSegments([], 0)).toEqual([]);
});
