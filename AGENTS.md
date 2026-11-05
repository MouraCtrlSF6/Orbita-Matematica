# Diretrizes do projeto

## Visão geral

Órbita Matemática é um jogo educativo em português, com temática de exploração espacial, desenvolvido em React, TypeScript e Vite. O foco é apoiar o estudo de expressões algébricas no 8º ano, incluindo valor numérico, variáveis, propriedades das operações e equações do primeiro grau.

O percurso atual contém tutorial interativo e 52 missões em três setores: Estação de lançamento (`launch`, 22), Oficina orbital (`workshop`, 15) e Base de exploração (`base`, 15). São 37 exercícios adaptados de `docs/Equacoes_do_primeiro_grau.docx` e 15 missões originais. Há desafios de alternativas, resposta numérica, montagem de expressões e criação guiada de um problema. As contagens são um retrato do catálogo atual; a interface deve continuar derivando-as dos dados.

O aplicativo é publicado como build estático e usa Firebase para as salas. O progresso local e as preferências ficam no `sessionStorage`, isolados por aba e sala.

## Exploração espacial e fluxo do jogo

A experiência atual permite pilotar uma nave pelo universo, entrar nos setores e visitar planetas, luas e asteroides que representam as missões. Preservar a exploração como parte do percurso, com câmera acompanhando a nave, radar e indicação da próxima missão.

- Usar setas ou WASD com a área de pilotagem focada; soltar as teclas interrompe o movimento. A entrada em um destino próximo exige Enter ou o botão Entrar.
- Em dispositivos de toque, oferecer botões de direção que respondem enquanto pressionados. Manter a opção Destinos em lista para acessar destinos liberados sem pilotagem e permitir sair da área de voo com Tab.
- Interromper movimento e som ao perder foco, ocultar a aba, abrir ajustes ou mudar de tela. O voo tem controle direto, sem inércia ou obstáculos punitivos.
- Concluir uma missão libera a seguinte. Continuar exploração e Voltar ao setor restauram a posição da visita, sem abrir automaticamente outra pergunta. Ao concluir o setor, o aluno pode voltar ao universo e visitar o próximo.
- Manter destinos bloqueados identificados, voo livre no setor liberado e revisita às missões concluídas. O tutorial inclui prática opcional de pilotagem antes da introdução à álgebra.
- Posições da nave são transitórias e ficam em memória durante a sessão. Recarregar abre o universo; Retomar exploração leva ao setor e às proximidades da próxima missão pendente. Reiniciar também limpa as posições da sessão.

## Som e controles

O som de propulsão é gerado localmente pela Web Audio API após uma interação de pilotagem, sem baixar arquivos de áudio. Vem ligado por padrão e deve tocar somente durante o movimento. A ausência ou o bloqueio de áudio não pode impedir o voo.

O botão na área de pilotagem, o ajuste Som da nave e o atalho M compartilham a preferência persistida `soundEnabled`. O atalho deve ignorar edição de campos, composição de texto, repetição de tecla e combinações com Ctrl, Alt ou Meta. Encerrar os recursos de áudio ao desmontar o controle de voo.

## Estrutura e responsabilidades

- `src/content/problems.json`: fonte única das missões jogáveis, organizada em seções na versão 3 do catálogo.
- `src/content/mission-catalog.ts`: valida o catálogo recebido como `unknown`, incluindo campos, expressões, IDs únicos e correspondência e ordem dos setores.
- `src/content/missions.ts`: carrega o JSON por meio do validador e exporta `missions` e `missionById`.
- `src/content/sectors.ts`: define os setores e sua ordem no percurso.
- `src/game/`: tipos, avaliação matemática, progressão e reducer; manter as regras independentes de React e APIs do navegador.
- `src/game/space.ts`: geometria do mundo, deslocamento, proximidade dos destinos e câmera, com funções puras. `validation.ts` reúne auxiliares de validação.
- `src/infrastructure/`: validação e persistência do progresso; `storage.ts` usa uma porta de armazenamento e `gameStorage.ts` adapta o navegador e informa falhas.
- `src/features/`: componentes e hooks por funcionalidade: mapa, tutorial, missões, descobertas e ajustes. Os estilos específicos usam utilitários Tailwind em `className`.
- `src/features/map/`: cena, destinos, radar e painéis; `flightController.ts` controla a simulação e os eventos, `useSpaceFlight.ts` conecta o ciclo de vida React e `thrusterSound.ts` adapta o áudio. Manter posições transitórias fora do estado de renderização React.
- `src/pages/`: entradas HTML e componentes das páginas de seleção, aluno e professor. Os hooks de estado do jogo, foco e atalho de som ficam em `src/pages/students/hooks/`.
- `src/app/`: estrutura visual do jogo e navegação interna da expedição. `routes/` reúne configuração e testes de rotas. `contexts/` reúne provedores e testes de contexto.
- `src/components/`: ícones e ilustrações SVG compartilhados. Regras globais de estilo ficam em `src/styles.css`.
- `src/styles/design-system.css`: configuração CSS do Tailwind 4, com tokens `@theme`, variantes `ds-*` e keyframes. O plugin `@tailwindcss/vite` compila os estilos. Reutilizar tokens e variantes diretamente em `className`; manter nomes completos dos utilitários no código, sem interpolar fragmentos. Somente esse arquivo e `src/styles.css` contêm CSS; não criar folhas por funcionalidade. Preservar o reset existente, sem Preflight, e os valores e efeitos visuais. As variantes `ds-down-*` e `ds-up-wide` mantêm os limites inclusivos dos breakpoints. Classes identificadoras usadas por controles, testes e seletores de contexto devem continuar estáveis.
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
- `npm run metrics`: medir a complexidade do código de produção com o motor da extensão CodeMetrics do VS Code; `npm run metrics:check` verifica o limite de 7 por unidade visível. `npm run metrics -- --json` exporta os valores.

O Playwright inicia o servidor de desenvolvimento na porta 5173 e pode reutilizar um servidor existente fora de CI. Para instalar o navegador e dependências em CI, usar `npx playwright install --with-deps chromium`. O Vite usa `base: './'` para permitir publicação em subdiretórios; preservar esse comportamento.

As métricas exigem a extensão `kisstkondoros.vscode-codemetrics` em `~/.vscode/extensions` ou seu diretório em `CODEMETRICS_EXTENSION`. Preservar os pesos e ajustes reais da extensão; não reduzir pesos nem excluir unidades para cumprir o limite. Essa medição inclui JSX e funções internas e difere da complexidade ciclomática do ESLint. Consultar `docs/complexidade.md` para o escopo e as decisões da refatoração.

## Estilo e organização do código

Usar dois espaços, aspas simples e ponto e vírgula. Componentes usam PascalCase; funções e variáveis, camelCase. Definir interfaces nomeadas para props e preferir enums para estados e variantes nomeados.

Manter componentes e hooks específicos junto de sua funcionalidade. Importar módulos diretamente. Calcular valores derivados durante a renderização, evitando estado duplicado sincronizado por efeitos. Validar dados externos como `unknown` antes de utilizá-los.

Preferir `rem` às medidas em `px` nos estilos da interface. Usar a escala de espaçamento do Tailwind e os tokens nomeados de tipografia e raios antes de valores arbitrários. A raiz permanece em `100%`; `text-root` no corpo define `0.9375rem`, preservando a fonte visual anterior sem fixar a preferência do navegador. Manter todos os breakpoints em `rem`, com limites inclusivos. Bordas finas de 1px, coordenadas da simulação e unidades internas de SVG são exceções; não converter a geometria do voo por substituição textual. Consultar `docs/design-system.md` ao revisar o tema.

## Conteúdo e regras matemáticas

- Adicionar missões em `problems.json`, na lista `problems` do setor correspondente. A ordem das seções e dos problemas define o percurso; o desbloqueio exige concluir todas as missões anteriores.
- Preservar IDs existentes, numeração original dos exercícios importados, referências curriculares e metadados de origem. Novos setores precisam constar em `sectors.ts` e no catálogo na mesma ordem.
- Seguir o contrato `Mission` de `src/game/types.ts`: objetivo, habilidade, enunciado, expressão, variável, fórmula, representação visual, três dicas e explicação, além dos campos específicos do formato.
- Preservar as três dicas no catálogo, mas respeitar `Sector.hintLimit` na interface: lançamento e oficina exibem somente a primeira; a base exibe as duas primeiras. Não oferecer botão para revelar a solução ou concluir sem acertar. Apresentar a explicação após a resposta correta.
- Representar expressões por nós `constant`, `variable` e `operation`. As operações são `add`, `subtract`, `multiply` e `divide`; a árvore deve preservar parênteses e prioridade. Nunca usar `eval` para calcular texto.
- Nas equações importadas, `formula` preserva a igualdade e `expression` representa o lado esquerdo. `variable` contém a solução, mas a resposta é conferida por `correctChoice`; o valor do lado esquerdo não é necessariamente x.
- Alternativas devem ter uma única resposta correta. Montagens devem registrar as ordens matematicamente equivalentes em `equivalentTokens`.
- A criação guiada atual usa `2 × x + 4`, com escolhas delimitadas de contexto e valor. Novas propostas exigem revisar componente, regras e validação do progresso persistido.
- O campo numérico atual aceita inteiros não negativos; soluções negativas do catálogo são respondidas por alternativas. Ampliar formatos de entrada exige revisar validação e testes.
- Modelos visuais mantêm quantidades de objetos inteiras e não negativas; os modelos negativos usam objetos que representam −1 e precisam de revisão pedagógica.
- Toda alteração de conteúdo requer resultados matemáticos calculados independentemente e registro das necessidades de revisão em `docs/pedagogia.md`. Atualizar o README e a documentação pedagógica quando catálogo ou sequência mudarem.

## Inclusão e revisão pedagógica

Manter textos para o aluno em português, curtos e adequados à idade. Preservar navegação por teclado, foco visível, rótulos acessíveis, texto ampliado, movimento reduzido e adaptação a telas menores.

Objetos visuais e dicas dentro do limite do setor são apoios sem penalização. Não introduzir cronômetro, perda de vidas ou competição. O diário registra conclusões e apoios e preserva registros históricos de solução guiada, embora novas conclusões exijam resposta correta. Concluir com ajuda não comprova domínio independente da habilidade.

Respeitar movimento reduzido dos ajustes ou do sistema, removendo brilhos animados; a câmera acompanha sem suavização. Preservar o acesso por lista para quem prefere evitar deslocamento contínuo. O cenário usa HTML, CSS e SVG, sem motor de jogo adicional.

A leitura opcional usa `speechSynthesis` e vozes em português disponíveis no navegador. O jogo deve continuar utilizável quando a API ou as vozes não estiverem disponíveis. O eventual processamento remoto da voz depende do navegador e do sistema; não prometer funcionamento totalmente offline.

O foco pedagógico usa EF08MA06, com introdução à variável pela EF07MA13 e equações referenciadas pela EF07MA18. A adequação dos enunciados, representações e progressão permanece sujeita à avaliação da professora; não inferir diagnósticos nem prometer resultados de aprendizagem.

## Persistência e privacidade

O armazenamento local usa a chave `orbita-matematica:v1:room:{roomId}` no `sessionStorage` e `SavedGame.version: 1`, independentes da versão 3 do catálogo. Retomar exige escolha explícita na entrada. O save legado do `localStorage` não tem dono identificável e não deve ser importado nas salas. Salvar localmente apenas conclusões, apoios, tentativas, criação guiada, estado do tutorial, última missão e preferências. Nunca armazenar nomes, diagnósticos ou credenciais no save.

As preferências incluem `largeText`, `reducedMotion` e `soundEnabled`. Saves anteriores sem a preferência de som continuam válidos e recebem `soundEnabled: true`. Manter compatibilidade com registros históricos de até três dicas e com `guided`, sem reativar a conclusão guiada na interface atual.

Preservar conclusões válidas por ID quando o catálogo crescer, mesmo que novas missões sejam inseridas antes delas; novas missões ficam pendentes e respeitam o desbloqueio sequencial. Mudanças incompatíveis no formato salvo exigem nova versão e migração explícita.

Falhas ou bloqueio do armazenamento devem permitir continuar em memória, com aviso de que o progresso não será mantido. Reiniciar a expedição exige confirmação na interface. Ao trocar de aluno em uma aba compartilhada, deixar a retomada desmarcada para começar com o progresso vazio.

## Validação das alterações

Colocar `*.test.ts` e `*.test.tsx` junto do comportamento coberto. Testar resultados matemáticos independentes, expressões equivalentes, catálogo inválido, desbloqueio, retomada, persistência corrompida ou indisponível e interações acessíveis. Não há percentual obrigatório de cobertura; os testes devem demonstrar comportamento relevante.

Para alterações de código ou conteúdo, executar os testes afetados, `npm run lint` e `npm run build`. Em alterações de código de produção, executar também `npm run metrics:check` quando a extensão estiver disponível e informar sua ausência caso impeça a verificação.

Para mudanças de interface, navegação, acessibilidade ou persistência, executar os percursos pertinentes de Playwright. Os percursos existentes cobrem as 52 missões, retomada, teclado, toque, câmera, radar, retorno à posição visitada, interrupções do voo, som, atalho M, ajustes, reinício confirmado, ausência de armazenamento, voz ou áudio, auditoria axe e telas menores. No retorno de missão, comparar a posição efetiva anterior à entrada com a posição restaurada. Uma auditoria automatizada não substitui avaliação manual ou pedagógica.

Em alterações apenas de documentação, verificar os caminhos, comandos e afirmações contra os arquivos atuais e conferir a formatação dos arquivos modificados. Informar verificações executadas e limitações reais, sem afirmar que testes não executados passaram.

## Commits e pull requests

Usar títulos curtos no imperativo, como `Add guided algebra mission`. Descrever comportamento, validação, referências a issues quando existirem e capturas de tela para mudanças visuais. Verificar a disponibilidade e o estado do Git antes de criar commits ou pull requests; esta cópia local pode não conter metadados de repositório.
