import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { publishRouteEntries, routeInputs } from './src/app/routes/static-route-entries';

export default defineConfig({
  base: './',
  plugins: [react(), publishRouteEntries()],
  build: {
    rollupOptions: {
      input: routeInputs,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
});
