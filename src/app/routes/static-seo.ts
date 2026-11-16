const descriptionTag = /\s*<meta\s+name="description"\s+content="[^"]*"\s*\/>/;

export function getHomeUrl() {
  const baseUrl = process.env.PAGES_BASE_URL || 'https://mouractrlsf6.github.io/Orbita-Matematica';

  return new URL(baseUrl.replace(/\/?$/, '/'));
}

export function utilityPageWithSeo(html: string, pageTitle: string) {
  return html
    .replace(descriptionTag, '\n    <meta name="robots" content="noindex" />')
    .replace(/<title>[^<]*<\/title>/, `<title>${pageTitle} · Órbita Matemática</title>`);
}

export function homeWithSeo(html: string, homeUrl: URL) {
  const tags = [
    `<link rel="canonical" href="${homeUrl.href}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:locale" content="pt_BR" />',
    '<meta property="og:site_name" content="Órbita Matemática" />',
    `<meta property="og:url" content="${homeUrl.href}" />`,
    '<meta property="og:title" content="Órbita Matemática · Jogo de álgebra para o 8º ano" />',
    '<meta property="og:description" content="Explore o espaço em missões de álgebra. Professores podem criar salas e acompanhar o progresso dos alunos." />',
    `<meta property="og:image" content="${new URL('orbita-compartilhamento.png', homeUrl).href}" />`,
    '<meta property="og:image:width" content="1440" />',
    '<meta property="og:image:height" content="900" />',
    '<meta property="og:image:alt" content="Tela inicial da Órbita Matemática com as opções de acesso para aluno e professor." />',
  ];

  return html.replace('  </head>', `    ${tags.join('\n    ')}\n  </head>`);
}

export function sitemapFor(homeUrl: URL) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${homeUrl.href}</loc></url>
</urlset>
`;
}
