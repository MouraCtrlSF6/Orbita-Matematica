import type { Plugin } from 'vite';

const routeEntries = ['sign/index.html', 'students/index.html', 'teachers/index.html'];
const pagesDirectory = 'src/pages/';

export const routeInputs = ['index.html', ...routeEntries.map((entry) => pagesDirectory + entry)];

export function publishRouteEntries(): Plugin {
  return {
    name: 'publish-route-entries',
    apply: 'build',
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        for (const fileName of routeEntries) {
          const originalPath = pagesDirectory + fileName;
          const entry = bundle[originalPath];
          if (entry?.type !== 'asset' || typeof entry.source !== 'string') {
            this.error(`Entrada HTML ausente: ${originalPath}`);
          }

          // Ao remover src/pages/ do caminho, o HTML fica dois níveis mais perto dos recursos.
          const source = entry.source.replaceAll(/((?:href|src)=")\.\.\/\.\.\/\.\.\//g, '$1../');
          bundle[fileName] = { ...entry, fileName, source };
          delete bundle[originalPath];
        }
      },
    },
  };
}
