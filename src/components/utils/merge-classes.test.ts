import { expect, it } from 'vitest';
import { mergeClasses } from './merge-classes';

it('keeps theme typography independent of colors and supports utility overrides', () => {
  expect(mergeClasses('text-white text-small', 'px-3 px-5')).toBe('text-white text-small px-5');
  expect(mergeClasses('text-body text-ink', 'text-heading text-danger')).toBe(
    'text-heading text-danger',
  );
  expect(mergeClasses('rounded-control', 'rounded-card')).toBe('rounded-card');
});
