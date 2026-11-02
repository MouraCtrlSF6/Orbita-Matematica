# Diretrizes do projeto

## Visão geral

Órbita Matemática é um jogo educativo em português, com temática de exploração espacial, desenvolvido em React, TypeScript e Vite. O foco é apoiar o estudo de expressões algébricas no 8º ano, incluindo valor numérico, variáveis, propriedades das operações e equações do primeiro grau.

O percurso atual contém tutorial interativo e 52 missões em três setores: Estação de lançamento (`launch`, 22), Oficina orbital (`workshop`, 15) e Base de exploração (`base`, 15). São 37 exercícios adaptados de `docs/Equacoes_do_primeiro_grau.docx` e 15 missões originais. Há desafios de alternativas, resposta numérica, montagem de expressões e criação guiada de um problema. As contagens são um retrato do catálogo atual; a interface deve continuar derivando-as dos dados.

O aplicativo funciona inteiramente no navegador, sem backend, cadastro ou sincronização. O progresso e as preferências ficam no `localStorage`. A entrega é um build estático; destino de hospedagem e implantação ainda precisam ser definidos.

## Estrutura e responsabilidades

- `src/content/problems.json`: fonte única das missões jogáveis, organizada em seções na versão 3 do catálogo.
- `src/content/mission-catalog.ts`: valida o catálogo recebido como `unknown`, incluindo campos, expressões, IDs únicos e correspondência e ordem dos setores.
- `src/content/missions.ts`: carrega o JSON por meio do validador e exporta `missions` e `missionById`.
- `src/content/sectors.ts`: define os setores e sua ordem no percurso.
- `src/game/`: tipos, avaliação matemática, progressão e reducer; manter as regras independentes de React e APIs do navegador.
- `src/infrastructure/`: validação e persistência do progresso; `storage.ts` usa uma porta de armazenamento e `gameStorage.ts` adapta o navegador e informa falhas.
- `src/features/`: componentes, hooks e estilos por funcionalidade: mapa, tutorial, missões, descobertas e ajustes.
- `src/app/`: composição das telas, estado do jogo e conexão com a persistência.
- `src/components/`: ícones e ilustrações SVG compartilhados. Estilos globais ficam em `src/styles.css` e `src/styles/`.
- `src/test/`: configuração e auxiliares de teste; testes de comportamento ficam próximos do código correspondente.
- `public/`: arquivos estáticos; fontes são empacotadas localmente por dependências npm.
- `e2e/`: percursos de navegador com Playwright e verificações de acessibilidade com axe.
- `docs/`: documentos de referência e `pedagogia.md`, com objetivos, sequência e necessidades de revisão pedagógica.

## Desenvolvimento e comandos

Usar Node.js 20.19+ na linha 20 ou 22.12+ e npm de forma consistente. Instalar com `npm ci` e atualizar `package-lock.json` quando houver alteração de dependências.

- `npm run dev`: iniciar o Vite em `127.0.0.1`; abrir a URL informada, sem abrir `index.html` diretamente.
- `npm run build`: verificar TypeScript e gerar os arquivos estáticos em `dist/`.
- `npm run preview`: servir o build para revisão local.
- `npm run lint`: executar ESLint, incluindo verificações de React Hooks e Fast Refresh.
- `npm run format:check`: verificar Prettier; `npm run format` aplica a formatação ao projeto.
- `npm test`: executar Vitest e Testing Library; `npm run test:watch` mantém os testes em observação.
- `npm test -- src/game/game.test.ts`: exemplo de execução direcionada.
- `npm run test:e2e`: executar Playwright em Chromium. Instalar antes com `npx playwright install chromium`.

O Playwright inicia o servidor de desenvolvimento na porta 5173 e pode reutilizar um servidor existente fora de CI. Para instalar o navegador e dependências em CI, usar `npx playwright install --with-deps chromium`. O Vite usa `base: './'` para permitir publicação em subdiretórios; preservar esse comportamento.

## Estilo e organização do código

Usar dois espaços, aspas simples e ponto e vírgula. Componentes usam PascalCase; funções e variáveis, camelCase. Definir interfaces nomeadas para props e preferir enums para estados e variantes nomeados.

Manter componentes e hooks específicos junto de sua funcionalidade. Importar módulos diretamente. Calcular valores derivados durante a renderização, evitando estado duplicado sincronizado por efeitos. Validar dados externos como `unknown` antes de utilizá-los.

## Conteúdo e regras matemáticas

- Adicionar missões em `problems.json`, na lista `problems` do setor correspondente. A ordem das seções e dos problemas define o percurso; o desbloqueio exige concluir todas as missões anteriores.
- Preservar IDs existentes, numeração original dos exercícios importados, referências curriculares e metadados de origem. Novos setores precisam constar em `sectors.ts` e no catálogo na mesma ordem.
- Seguir o contrato `Mission` de `src/game/types.ts`: objetivo, habilidade, enunciado, expressão, variável, fórmula, representação visual, três dicas e explicação, além dos campos específicos do formato.
- Representar expressões por nós `constant`, `variable` e `operation`. As operações são `add`, `subtract`, `multiply` e `divide`; a árvore deve preservar parênteses e prioridade. Nunca usar `eval` para calcular texto.
- Nas equações importadas, `formula` preserva a igualdade e `expression` representa o lado esquerdo. `variable` contém a solução, mas a resposta é conferida por `correctChoice`; o valor do lado esquerdo não é necessariamente x.
- Alternativas devem ter uma única resposta correta. Montagens devem registrar as ordens matematicamente equivalentes em `equivalentTokens`.
- A criação guiada atual usa `2 × x + 4`, com escolhas delimitadas de contexto e valor. Novas propostas exigem revisar componente, regras e validação do progresso persistido.
- O campo numérico atual aceita inteiros não negativos; soluções negativas do catálogo são respondidas por alternativas. Ampliar formatos de entrada exige revisar validação e testes.
- Modelos visuais mantêm quantidades de objetos inteiras e não negativas; os modelos negativos usam objetos que representam −1 e precisam de revisão pedagógica.
- Toda alteração de conteúdo requer resultados matemáticos calculados independentemente e registro das necessidades de revisão em `docs/pedagogia.md`. Atualizar o README e a documentação pedagógica quando catálogo ou sequência mudarem.

## Inclusão e revisão pedagógica

Manter textos para o aluno em português, curtos e adequados à idade. Preservar navegação por teclado, foco visível, rótulos acessíveis, texto ampliado, movimento reduzido e adaptação a telas menores.

Objetos visuais, três dicas progressivas e conclusão guiada são apoios sem penalização. Não introduzir cronômetro, perda de vidas ou competição. O diário registra conclusões e apoios; concluir com ajuda não comprova domínio independente da habilidade.

A leitura opcional usa `speechSynthesis` e vozes em português disponíveis no navegador. O jogo deve continuar utilizável quando a API ou as vozes não estiverem disponíveis. O eventual processamento remoto da voz depende do navegador e do sistema; não prometer funcionamento totalmente offline.

O foco pedagógico usa EF08MA06, com introdução à variável pela EF07MA13 e equações referenciadas pela EF07MA18. A adequação dos enunciados, representações e progressão permanece sujeita à avaliação da professora; não inferir diagnósticos nem prometer resultados de aprendizagem.

## Persistência e privacidade

O armazenamento atual usa a chave `orbita-matematica:v1` e `SavedGame.version: 1`, independentes da versão 3 do catálogo. Salvar apenas conclusões, apoios, tentativas, criação guiada, estado do tutorial, última missão e preferências. Nunca armazenar nomes, diagnósticos ou credenciais.

Preservar conclusões válidas por ID quando o catálogo crescer, mesmo que novas missões sejam inseridas antes delas; novas missões ficam pendentes e respeitam o desbloqueio sequencial. Mudanças incompatíveis no formato salvo exigem nova versão e migração explícita.

Falhas ou bloqueio do armazenamento devem permitir continuar em memória, com aviso de que o progresso não será mantido. Reiniciar a expedição exige confirmação na interface. Em computadores compartilhados, o progresso pertence ao navegador e pode ser visto por outras pessoas; limpar os dados do navegador apaga o registro local.

## Validação das alterações

Colocar `*.test.ts` e `*.test.tsx` junto do comportamento coberto. Testar resultados matemáticos independentes, expressões equivalentes, catálogo inválido, desbloqueio, retomada, persistência corrompida ou indisponível e interações acessíveis. Não há percentual obrigatório de cobertura; os testes devem demonstrar comportamento relevante.

Para alterações de código ou conteúdo, executar os testes afetados, `npm run lint` e `npm run build`. Para mudanças de interface, navegação, acessibilidade ou persistência, executar também os percursos pertinentes de Playwright. Os percursos existentes cobrem as 52 missões, retomada, teclado, ajustes, reinício confirmado, ausência de armazenamento ou voz, auditoria axe e telas menores. Uma auditoria automatizada não substitui avaliação manual ou pedagógica.

Em alterações apenas de documentação, verificar os caminhos, comandos e afirmações contra os arquivos atuais e conferir a formatação dos arquivos modificados. Informar verificações executadas e limitações reais, sem afirmar que testes não executados passaram.

## Commits e pull requests

Usar títulos curtos no imperativo, como `Add guided algebra mission`. Descrever comportamento, validação, referências a issues quando existirem e capturas de tela para mudanças visuais. Verificar a disponibilidade e o estado do Git antes de criar commits ou pull requests; esta cópia local pode não conter metadados de repositório.
