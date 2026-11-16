import type { Plugin } from 'vite';
import { fixedRoutes } from './fixed-routes';
import { getHomeUrl, homeWithSeo, sitemapFor, utilityPageWithSeo } from './static-seo';

const routeTitles: Record<keyof typeof fixedRoutes, string> = {
  sign: 'Escolher perfil',
  teachers: 'Área do professor',
  teacherRooms: 'Salas do professor',
  createRoom: 'Criar sala',
  students: 'Área do aluno',
  studentRooms: 'Salas do aluno',
  enterRoom: 'Entrar na sala',
};

function getPublishedBase() {
  const path = (process.env.PAGES_BASE_PATH ?? '').replace(/^\/+|\/+$/g, '');
  return path ? `/${path}/` : '/';
}

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
        const homeUrl = getHomeUrl();
        const template = entry.source;

        for (const route of Object.keys(fixedRoutes) as (keyof typeof fixedRoutes)[]) {
          const path = fixedRoutes[route];
          const depth = path.split('/').length - 1;
          this.emitFile({
            type: 'asset',
            fileName: `${path.slice(1)}/index.html`,
            source: utilityPageWithSeo(
              htmlForBase(template, '../'.repeat(depth)),
              routeTitles[route],
            ),
          });
        }
        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: utilityPageWithSeo(htmlForBase(template, getPublishedBase()), 'Acesso direto'),
        });
        entry.source = homeWithSeo(template, homeUrl);
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapFor(homeUrl) });
        this.emitFile({
          type: 'asset',
          fileName: 'robots.txt',
          source: `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', homeUrl).href}\n`,
        });
      },
    },
  };
}
