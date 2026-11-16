# Diretrizes do projeto

## Visão geral e referências

Órbita Matemática é um jogo de álgebra para o 8º ano, com exploração espacial, salas de aula e acompanhamento pelo professor. Usa React, TypeScript, Vite, React Router, Tailwind CSS 4, Radix UI, Firebase e React PDF. O catálogo padrão tem 52 missões em três setores; cada sala pode personalizar suas questões.

Consultar `README.md` para execução, controles, salas e publicação; `docs/pedagogia.md` para currículo e revisão pedagógica; `docs/design-system.md` para estilos; `docs/complexidade.md` para métricas. Conferir a implementação antes de afirmar o estado de serviços remotos.

## Organização e estilo

- `src/content/`: catálogo padrão, validação e setores. `src/game/`: matemática, progressão, geometria, contratos e regras puras, sem React ou APIs do navegador.
- `src/infrastructure/`: persistência e integração Firebase. `src/pages/`: entradas finas das rotas. `src/modules/`: funcionalidades de perfil, professor e estudante. Dependências de entrada seguem `app/routes → pages → modules`. `src/app/`: composição, sessão e rotas. `src/components/`: UI compartilhada.
- Usar `Component/Component.tsx`; filhos exclusivos, hooks, contextos e utilitários ficam junto do proprietário. Compartilhados ficam no ancestral comum. Importar diretamente, sem arquivos de reexportação.
- Usar dois espaços, aspas simples, ponto e vírgula, componentes PascalCase, funções camelCase, interfaces nomeadas para props e preferir enums para estados e variantes. Validar dados externos como `unknown`; calcular valores derivados sem duplicar estado.
- Consumir os contextos de missão, jogo e catálogo; evitar repassar sessões por componentes de layout. Posições transitórias de voo ficam fora do estado de renderização React.
- Reutilizar os controles de `src/components/`, variantes CVA e `mergeClasses`; preservar semântica, foco e teclado das primitivas Radix. Usar `useToast` para notificações de ações e manter confirmações destrutivas em diálogos. As páginas de criação de sala e painel do professor são carregadas sob demanda por `lazy`/`Suspense` e usam o `Spinner` compartilhado.
- Usar utilitários Tailwind completos em `className`, tokens e variantes `ds-*`. CSS somente em `src/styles.css` e `src/styles/design-system.css`, sem Preflight. Preferir `rem`; preservar breakpoints inclusivos, classes usadas por controles/testes e geometria do voo.

## Conteúdo e catálogo por sala

- `problems.json` é a fonte do catálogo padrão, validado por `mission-catalog.ts`. Preservar IDs, referências curriculares, origens, ordem dos setores e respostas matematicamente corretas. Alterações pedagógicas exigem resultados independentes e revisão documentada.
- `src/game/room-catalog.ts` define o catálogo por sala. `rooms/{roomId}/catalog` guarda revisão e listas dos três setores como strings JSON, preservando arrays vazios. Não criar setores adicionais nem alterar o padrão ao personalizar uma sala.
- Criar salas com catálogo, metadados e índice atomicamente. Salas antigas sem catálogo usam o padrão até a primeira alteração. Escritas usam ETag e revisão; conflitos exigem recarregar.
- O aluno valida e carrega o catálogo uma vez antes do registro. A cópia fica em `StudentRoom.missions`, em memória; não adicionar polling ou assinatura de questões. Nova revisão exige nova entrada. Saves não contêm catálogo.
- Regras puras recebem o catálogo como argumento; telas usam o contexto da partida. Totais, mapas e desbloqueios consideram essa cópia. Setores e salas vazios são válidos.
- Adicionar, excluir e reordenar questões afeta apenas a sala. Reordenação por arraste ou teclado ocorre dentro do mesmo setor, preservando IDs e incrementando a revisão. Exclusões mantêm o histórico; ao reencontrar um aluno, acrescentar missões ausentes sem sobrescrever tentativas.
- A autoria oferece Objetiva, Discursiva, Montagem e Criação guiada. `ChallengeKind.Text` corrige a resposta cadastrada ignorando maiúsculas e espaços extras; preservar `Number` e sua correção numérica nas questões antigas. Expressões opcionais de Objetiva/Discursiva usam árvores de operações, nunca `eval`. Montagens derivam a expressão da ordem principal e validam subconjuntos das peças disponíveis, repetições e equivalência algébrica. A criação guiada permanece em `2 × x + 4`.
- Nas equações importadas, `formula` preserva a igualdade, `expression` é o lado esquerdo e `variable` é a solução; conferir a alternativa por `correctChoice`. O campo numérico aceita inteiros não negativos.

## Experiência e inclusão

- Textos em português, breves e adequados à idade. Preservar teclado, foco, toque, texto ampliado com caixa alta e maior contraste, movimento reduzido e acesso aos destinos por lista. A narração lê enunciado, operadores e alternativas na ordem da tela.
- O desbloqueio é sequencial. Retornar de uma missão restaura a posição da visita; não abrir automaticamente outra pergunta. Parar voo e som ao soltar controles, perder foco, ocultar a aba, abrir ajustes ou mudar de tela.
- Som é opcional; botão, ajustes e atalho M compartilham `soundEnabled`. Ignorar o atalho durante edição, composição, repetição ou modificadores. Ausência de áudio ou voz não impede jogar; liberar recursos ao desmontar.
- Preservar três dicas no catálogo padrão, exibindo o limite do setor: uma no lançamento/oficina e duas na base. Questões da sala aceitam zero a três dicas, objetivo/habilidade vazios e ausência de apoio visual; não renderizar apoios vazios. Concluir exige resposta correta; explicar após o acerto. Apoios não são penalizados. Não adicionar cronômetro, vidas ou competição, nem inferir diagnósticos ou domínio pedagógico pela conclusão.

## Salas, persistência e privacidade

- A raiz e `/sign` exibem a escolha de perfil. A entrada do aluno fica em `/students/rooms/enter` e a criação de sala em `/teachers/rooms/create`. O jogo e o painel usam rotas aninhadas sob `rooms/:roomName`. Preservar a validação de sessão, catálogo e desbloqueio ao resolver links diretos. Reutilizar `src/game/room-name.ts`.
- A sessão da partida fica em memória. A autenticação anônima persiste em `sessionStorage` durante a sessão da aba, com fallback em memória se o armazenamento estiver bloqueado; aguardar sua restauração antes de criar outro usuário. Progresso local usa `sessionStorage`, chave `orbita-matematica:v1:room:{roomId}` e `SavedGame.version: 1`; retomar exige escolha explícita. Não importar o save legado compartilhado do `localStorage`.
- Preservar conclusões por ID, compatibilidade histórica e migração explícita para mudanças incompatíveis. Armazenamento bloqueado permite jogar em memória com aviso. Reinício confirmado limpa progresso local e posições, preservando o histórico remoto.
- Nomes e respostas são enviados ao Firebase, fora do save local. Não guardar diagnósticos ou credenciais. As regras do repositório exigem autenticação para leitura. O proprietário pode ler a sala inteira. Os alunos usam consultas pontuais ao índice, ao catálogo aberto e ao próprio registro. Escritas respeitam autenticação, propriedade e UID; remover aluno também bloqueia reenvios, excluir sala libera seu nome.
- A fila de `src/modules/students/session/room-sync.ts` preserva ordem e identidade das tentativas, repete falhas transitórias e interrompe rejeições permanentes. Pendências são apenas em memória. Retomada não inventa respostas; cancelar o acompanhamento encerra a conexão.
- Salas exigem URL do Realtime Database, autenticação anônima e App Check com reCAPTCHA Enterprise (`VITE_FIREBASE_RECAPTCHA_ENTERPRISE_SITE_KEY`). Usar apenas configuração pública em `VITE_FIREBASE_*` e manter tokens de depuração fora do build e do Git. Revisar regras, validadores e sincronização em conjunto e publicar as regras separadamente do frontend.

## Relatórios e métricas de uso

- `src/modules/teachers/room-report/` gera o PDF no navegador em um worker. Preservar a distinção entre acerto na primeira tentativa, conclusão após novas tentativas e ausência de registro. Questões excluídas ficam no histórico.
- O Analytics registra criação e exclusão de salas, entrada de alunos e geração de PDF com o ID da sala. Falhas na coleta não interrompem a ação.

## Comandos e validação

Usar Node.js 20.19+ na linha 20 ou 22.12+, npm e `npm ci`; atualizar o lockfile ao mudar dependências.

- Desenvolvimento: `npm run dev`; build/prévia: `npm run build` e `npm run preview`.
- Qualidade: `npm run lint`, `npm run format:check`; formatar apenas os arquivos necessários com Prettier.
- Testes: `npm test` (Vitest, `*.test.ts/tsx` dentro de `tests/` na área responsável); `npm run test:e2e` (Playwright, incluindo `src/app/routes/*.spec.ts`). Instalar Chromium com `npx playwright install chromium`.
- Complexidade: `npm run metrics:check`, limite 7 por unidade visível. Exige a extensão CodeMetrics ou `CODEMETRICS_EXTENSION`; não reduzir pesos ou excluir unidades para cumprir o limite.

Para código/conteúdo, executar testes afetados, lint e build; para código de produção, verificar métricas quando disponíveis. Para UI, navegação ou persistência, executar os percursos Playwright pertinentes, incluindo autoria, reordenação, componentes e notificações quando afetados. Testar matemática independente, equivalências, catálogo inválido/vazio, progresso, isolamento de salas, falhas e acessibilidade. Mocks não validam o Firebase real. Mudanças de regras exigem emuladores com dados fictícios:

```sh
npx --yes firebase-tools@14 emulators:exec --project demo-orbita --only auth,database "node scripts/test-database-rules.mjs"
```

Para documentação, conferir referências e formatação. Informar validações executadas e limitações. No GitHub Pages, preservar `base: './'`, `app-base`, o basename e as entradas em `fixed-routes.ts`. O `404.html` abre rotas dinâmicas com status HTTP 404 e usa `PAGES_BASE_PATH`. O build usa `PAGES_BASE_URL` para a URL canônica, Open Graph, sitemap e robots. O sitemap inclui apenas a página inicial e as páginas auxiliares usam `noindex`. Consultar `.github/workflows/jekyll-gh-pages.yml` e `src/app/routes/static-seo.ts`. Usar commits curtos no imperativo e PRs com comportamento, validação e imagens para mudanças visuais.
