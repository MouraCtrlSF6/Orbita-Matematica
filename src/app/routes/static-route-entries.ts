import type { Plugin } from 'vite';
import { fixedRoutes } from './fixed-routes';

function htmlForBase(html: string, base: string) {
  return html
    .replace('<meta name="app-base" content="./"', `<meta name="app-base" content="${base}"`)
    .replaceAll(/((?:href|src)=")\.\//g, (_match, prefix: string) => prefix + base);
}

export function publishRouteEntries(): Plugin {
  return {
    name: 'publish-route-entries',
    apply: 'build',
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const entry = bundle['index.html'];

        if (entry?.type !== 'asset' || typeof entry.source !== 'string') {
          return this.error('Entrada HTML ausente: index.html');
        }
        for (const path of Object.values(fixedRoutes)) {
          const depth = path.split('/').length - 1;
          this.emitFile({
            type: 'asset',
            fileName: `${path.slice(1)}/index.html`,
            source: htmlForBase(entry.source, '../'.repeat(depth)),
          });
        }
      },
    },
  };
}
