import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { publishRouteEntries } from './src/app/routes/static-route-entries';

export default defineConfig({
  base: './',
  plugins: [
    react({ exclude: [/node_modules/, /[\\/]teachers[\\/]room-report[\\/]/] }),
    tailwindcss(),
    publishRouteEntries(),
  ],
  optimizeDeps: {
    entries: ['index.html', 'e2e/fixtures/components.html'],
    include: ['@react-pdf/renderer'],
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    restoreMocks: true,
  },
});
