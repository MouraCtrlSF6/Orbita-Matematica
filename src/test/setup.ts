import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(cleanup);
Object.defineProperty(window, 'scrollTo', { value: vi.fn(), writable: true });
// JSDOM has no layout observer; Radix uses it to size hidden form controls.
globalThis.ResizeObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};
