# Diretrizes do projeto

## Visão geral

Órbita Matemática é um jogo educativo em português, com temática de exploração espacial, desenvolvido em React 19, TypeScript e Vite, com React Router para navegação e Tailwind CSS 4 para estilos. O foco é apoiar o estudo de expressões algébricas no 8º ano, incluindo valor numérico, variáveis, propriedades das operações e equações do primeiro grau.

O percurso atual contém tutorial interativo e 52 missões em três setores: Estação de lançamento (`launch`, 22), Oficina orbital (`workshop`, 15) e Base de exploração (`base`, 15). São 37 exercícios adaptados de `docs/Equacoes_do_primeiro_grau.docx` e 15 missões originais. Há desafios de alternativas, resposta numérica, montagem de expressões e criação guiada de um problema. As contagens são um retrato do catálogo atual; a interface deve continuar derivando-as dos dados.

O frontend gera um build estático e integra Firebase Authentication anônimo e Realtime Database para salas de aula. O progresso local e as preferências ficam no `sessionStorage`, isolados por aba e sala. Há um workflow de publicação no GitHub Pages; sua presença não comprova o estado da implantação ou da configuração remota.

## Perfis, salas e acompanhamento

- `/sign` permite escolher o perfil; caminhos desconhecidos redirecionam para essa página.
- `/students` exige o nome de uma sala aberta e o nome completo do aluno, com até 100 caracteres. O jogo abre após confirmar o registro no Firebase. A opção de continuar o progresso da mesma aba e sala é explícita; sem ela, a entrada começa com progresso vazio.
- `/teachers` permite criar uma sala com nome disponível e acompanhar alunos, setor atual, estados de setores e missões, uso de apoios e respostas corretas e incorretas em tempo real. O registro das tentativas mantém ordem, rótulo e valor da resposta; a criação inclui contexto e variável.
- A normalização do nome da sala remove acentos, ignora maiúsculas, reduz espaços e aceita de 3 a 48 caracteres, com letras ASCII, números, espaços e hífens, começando e terminando com letra ou número. Reutilizar `src/game/room-name.ts`.
- Remover aluno apaga seu registro e grava um marcador que bloqueia novas escritas daquele UID na sala. O jogo local continua aberto. Excluir sala remove também o índice do nome e libera seu uso; preservar as operações atômicas e os fluxos de confirmação existentes.
- Perfil, sala e identidade anônima ficam em memória. Recarregar retorna ao formulário de entrada ou criação; o nome e a propriedade da sala não são recuperados automaticamente pelo painel. Sair da área do professor encerra a assinatura do banco.

## Firebase e sincronização

`src/infrastructure/firebase/firebase-app.ts` lê a configuração pública `VITE_FIREBASE_*`. A inicialização exige `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID` e `VITE_FIREBASE_APP_ID`; as salas também exigem `VITE_FIREBASE_DATABASE_URL` e o provedor Anônimo habilitado. Usar o `.env` local sem copiar seus valores para documentação, logs ou commits. A configuração do Vite entra no JavaScript público do build; não colocar credenciais administrativas nessas variáveis. App Check ainda não está implementado.

`rooms.ts` autentica com persistência em memória e usa REST autenticado para escritas e consultas pontuais, com timeout de 12 segundos. O registro do aluno usa PUT condicional e confirma o registro existente ao receber 412. O painel carrega `firebase/database` dinamicamente e usa assinatura `onValue`; cancelar deve remover a assinatura e encerrar a conexão.

`src/pages/students/room-sync.ts` mantém uma fila ordenada de patches em memória. Falhas transitórias repetem o mesmo registro, com espera progressiva de 1 a 30 segundos; rejeições HTTP permanentes interrompem os envios. Preservar a ordem e a identidade das tentativas ao repetir uma escrita. Pendências podem ser perdidas ao recarregar. Reiniciar a expedição limpa o progresso local e as posições de voo, preservando o histórico já enviado à sala. Retomar conclusões e apoios não deve inventar respostas anteriores.

`database.rules.json` é o contrato de permissões e validação do Realtime Database. Atualmente, `.read: true` na raiz permite leitura pública, inclusive dos nomes, progresso e respostas. As escritas exigem autenticação e respeitam o proprietário da sala, o UID do aluno e os marcadores de remoção. Não descrever os registros remotos como privados nem tratar a escolha do perfil na interface como autorização. Alterações no contrato exigem revisar regras, validadores, sincronização e testes em conjunto.

## Exploração espacial e fluxo do jogo

A experiência atual permite pilotar uma nave pelo universo, entrar nos setores e visitar planetas, luas e asteroides que representam as missões. Preservar a exploração como parte do percurso, com câmera acompanhando a nave, radar e indicação da próxima missão.

- Usar setas ou WASD com a área de pilotagem focada; soltar as teclas interrompe o movimento. A entrada em um destino próximo exige Enter ou o botão Entrar.
- Em dispositivos de toque, oferecer botões de direção que respondem enquanto pressionados. Manter a opção Destinos em lista para acessar destinos liberados sem pilotagem e permitir sair da área de voo com Tab.
- Interromper movimento e som ao perder foco, ocultar a aba, abrir ajustes ou mudar de tela. O voo tem controle direto, sem inércia ou obstáculos punitivos.
- Concluir uma missão libera a seguinte. Continuar exploração e Voltar ao setor restauram a posição da visita, sem abrir automaticamente outra pergunta. Ao concluir o setor, o aluno pode voltar ao universo e visitar o próximo.
- Manter destinos bloqueados identificados, voo livre no setor liberado e revisita às missões concluídas. O tutorial inclui prática opcional de pilotagem antes da introdução à álgebra.
- Posições da nave são transitórias e ficam em memória durante a sessão. Após recarregar, é necessário entrar novamente na sala; ao optar por continuar, o jogo abre no universo. Retomar exploração leva ao setor e às proximidades da próxima missão pendente. Reiniciar também limpa as posições da sessão.

## Som e controles

O som de propulsão é gerado localmente pela Web Audio API após uma interação de pilotagem, sem baixar arquivos de áudio. Vem ligado por padrão e deve tocar somente durante o movimento. A ausência ou o bloqueio de áudio não pode impedir o voo.

O botão na área de pilotagem, o ajuste Som da nave e o atalho M compartilham a preferência persistida `soundEnabled`. O atalho deve ignorar edição de campos, composição de texto, repetição de tecla e combinações com Ctrl, Alt ou Meta. Encerrar os recursos de áudio ao desmontar o controle de voo.

## Estrutura e responsabilidades

- `src/content/problems.json`: fonte do catálogo padrão das salas, organizada em seções na versão 3 do catálogo.
- `src/content/mission-catalog.ts`: valida o catálogo recebido como `unknown`, incluindo campos, expressões, IDs únicos e correspondência e ordem dos setores.
- `src/content/missions.ts`: carrega o JSON por meio do validador e exporta `missions` e `missionById`.
- `src/content/sectors.ts`: define os setores e sua ordem no percurso.
- `src/game/`: tipos, avaliação matemática, progressão e reducer; manter as regras independentes de React e APIs do navegador.
- `src/game/room-progress.ts`: contratos e construção do acompanhamento de sala, estados de progresso e representação de respostas, sem dependência do Firebase. `room-name.ts` normaliza nomes de sala.
- `src/game/space.ts`: geometria do mundo, deslocamento, proximidade dos destinos e câmera, com funções puras. `validation.ts` reúne auxiliares de validação.
- `src/infrastructure/`: `storage.ts` valida o save por uma porta de armazenamento; `gameStorage.ts` adapta `sessionStorage` por sala, mantém fallback em memória e informa falhas. `firebase/` contém configuração, autenticação, operações de salas e validação dos registros remotos.
- `src/features/`: componentes e hooks por funcionalidade: mapa, tutorial, missões, descobertas e ajustes. Os estilos específicos usam utilitários Tailwind em `className`.
- `src/features/map/`: cena, destinos, radar e painéis; `flightController.ts` controla a simulação e os eventos, `SpaceFlight/hooks/useSpaceFlight.ts` conecta o ciclo de vida React e `thrusterSound.ts` adapta o áudio. Manter posições transitórias fora do estado de renderização React.
- `src/features/mission/MissionScreen/`: organiza a tela e seus descendentes. `contexts/MissionProvider/` é a fonte do estado da missão; os consumidores usam `hooks/useMissionContext.ts`, sem repassar a sessão por componentes de layout. Os controles de resposta recebem somente seus dados e callbacks por props.
- `src/pages/students/StudentEntryPage/StudentsPage/contexts/StudentGameProvider/`: mantém o estado do jogo, navegação, ajustes e sessão de voo, com seus hooks privados em `hooks/`. Os consumidores usam o hook compartilhado `src/pages/students/hooks/useStudentGame.ts`. As posições continuam em memória fora do estado de renderização.
- `src/pages/teachers/TeachersPage/`: organiza a área do professor. Cada formulário mantém seus hooks de criação de salas, exclusão ou remoção de alunos dentro da própria pasta, com estado de envio e erros.
- `src/pages/students/room-sync.ts`: adaptação das atividades de missão em atualizações remotas, fila e estado de sincronização, separados das regras puras de `src/game/`.
- `src/pages/`: entradas HTML e componentes das páginas de seleção, aluno e professor. Hooks privados ficam na pasta `hooks/` do componente responsável; hooks e contextos usados por vários ramos permanecem no escopo comum da página ou funcionalidade.
- `src/app/`: estrutura visual do jogo e navegação interna da expedição. `routes/` reúne configuração, entradas estáticas e testes Playwright de rotas. `contexts/SessionProvider/` mantém a sessão global; `contexts/hooks/` expõe acesso à sessão e acompanhamento do professor.
- `src/components/`: ícones e ilustrações SVG compartilhados. Regras globais de estilo ficam em `src/styles.css`.
- `src/styles/design-system.css`: configuração CSS do Tailwind 4, com tokens `@theme`, variantes `ds-*` e keyframes. O plugin `@tailwindcss/vite` compila os estilos. Reutilizar tokens e variantes diretamente em `className`; manter nomes completos dos utilitários no código, sem interpolar fragmentos. Somente esse arquivo e `src/styles.css` contêm CSS; não criar folhas por funcionalidade. Preservar o reset existente, sem Preflight, e os valores e efeitos visuais. As variantes `ds-down-*` e `ds-up-wide` mantêm os limites inclusivos dos breakpoints. Classes identificadoras usadas por controles, testes e seletores de contexto devem continuar estáveis.
- `src/test/`: configuração e auxiliares de teste; testes de comportamento ficam próximos do código correspondente.
- `public/`: arquivos estáticos; fontes são empacotadas localmente por dependências npm.
- `e2e/`: percursos de navegador com Playwright e verificações de acessibilidade com axe. `rooms-fixture.ts` substitui o módulo de salas por um backend simulado nos percursos que a usam; isso não valida o Firebase real.
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

O Vitest executa `src/**/*.test.{ts,tsx}`. Arquivos `src/app/routes/*.spec.ts` pertencem ao Playwright, junto dos percursos `e2e/*.spec.ts`.

O Playwright inicia o servidor de desenvolvimento na porta 5173 e pode reutilizar um servidor existente fora de CI. Para instalar o navegador e dependências em CI, usar `npx playwright install --with-deps chromium`. O Vite usa `base: './'` para permitir publicação em subdiretórios; preservar esse comportamento.

As métricas exigem a extensão `kisstkondoros.vscode-codemetrics` em `~/.vscode/extensions` ou seu diretório em `CODEMETRICS_EXTENSION`. Preservar os pesos e ajustes reais da extensão; não reduzir pesos nem excluir unidades para cumprir o limite. Essa medição inclui JSX e funções internas e difere da complexidade ciclomática do ESLint. Consultar `docs/complexidade.md` para o escopo e as decisões da refatoração.

## Build e publicação

`vite.config.ts` usa React, Tailwind e `publishRouteEntries()`, com entradas HTML na raiz e em `src/pages/{sign,students,teachers}/index.html`. O plugin publica as entradas como `dist/{sign,students,teachers}/index.html` e ajusta os caminhos dos assets. Preservar `base: './'`, o meta `app-base` e o cálculo de basename em `AppRouter` para links diretos, histórico e recarregamento em subdiretórios.

`.github/workflows/jekyll-gh-pages.yml`, apesar do nome herdado de Jekyll, executa o build Vite com Node 22 e publica `dist/` no GitHub Pages em pushes para `master` ou execução manual. O workflow atual roda `npm ci` e `npm run build`, sem lint, testes ou métricas e sem passagem explícita das variáveis Firebase ao build. A disponibilidade de salas na publicação depende dessa configuração; não afirmar que está habilitada apenas porque o workflow existe. As regras do banco são publicadas separadamente, não por esse workflow.

## Estilo e organização do código

Usar dois espaços, aspas simples e ponto e vírgula. Componentes usam PascalCase; funções e variáveis, camelCase. Definir interfaces nomeadas para props e preferir enums para estados e variantes nomeados.

Declarar cada componente em uma pasta com seu nome, no formato `Component/Component.tsx`. A estrutura de pastas deve refletir a hierarquia de composição: filhos exclusivos ficam em subpastas do componente que os utiliza, como `PilotActions/DestinationList/DestinationLinks/DestinationLink/DestinationLink.tsx`. Aplicar a regra a todas as funcionalidades e páginas. Componentes usados por vários ramos ficam no ancestral comum mais próximo dentro da funcionalidade; componentes compartilhados entre funcionalidades preservam seu módulo de origem. Hooks, contextos, tipos e utilitários privados acompanham o proprietário, usando `hooks/`, `contexts/` e `utils/` quando apropriado. Testes unitários ficam junto do arquivo coberto. Preservar as fronteiras de domínio, conteúdo e infraestrutura e manter configurações, entradas HTML e testes E2E em seus locais próprios. Importar módulos diretamente, sem criar arquivos de reexportação para esconder a hierarquia. Calcular valores derivados durante a renderização, evitando estado duplicado sincronizado por efeitos. Validar dados externos como `unknown` antes de utilizá-los.

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

O armazenamento local usa a chave `orbita-matematica:v1:room:{roomId}` no `sessionStorage` e `SavedGame.version: 1`, independentes da versão 3 do catálogo. Retomar exige escolha explícita na entrada. O save legado do `localStorage` não tem dono identificável e não deve ser importado nas salas. Salvar localmente apenas conclusões, apoios, tentativas, criação guiada, estado do tutorial, última missão e preferências. Nunca armazenar nomes, diagnósticos ou credenciais no save. O nome informado na entrada e as respostas são enviados ao Firebase e ficam fora desse save; preservar essa distinção ao atualizar a interface e a documentação de privacidade.

As preferências incluem `largeText`, `reducedMotion` e `soundEnabled`. Saves anteriores sem a preferência de som continuam válidos e recebem `soundEnabled: true`. Manter compatibilidade com registros históricos de até três dicas e com `guided`, sem reativar a conclusão guiada na interface atual.

Preservar conclusões válidas por ID quando o catálogo crescer, mesmo que novas missões sejam inseridas antes delas; novas missões ficam pendentes e respeitam o desbloqueio sequencial. Mudanças incompatíveis no formato salvo exigem nova versão e migração explícita.

Falhas ou bloqueio do armazenamento devem permitir continuar em memória, com aviso de que o progresso não será mantido. Reiniciar a expedição exige confirmação na interface. Ao trocar de aluno em uma aba compartilhada, deixar a retomada desmarcada para começar com o progresso vazio.

## Validação das alterações

Colocar `*.test.ts` e `*.test.tsx` junto do comportamento coberto. Testar resultados matemáticos independentes, expressões equivalentes, catálogo inválido, desbloqueio, retomada, persistência corrompida ou indisponível e interações acessíveis. Não há percentual obrigatório de cobertura; os testes devem demonstrar comportamento relevante.

Para alterações de código ou conteúdo, executar os testes afetados, `npm run lint` e `npm run build`. Em alterações de código de produção, executar também `npm run metrics:check` quando a extensão estiver disponível e informar sua ausência caso impeça a verificação.

Para mudanças de interface, navegação, acessibilidade ou persistência, executar os percursos pertinentes de Playwright. Os percursos existentes cobrem as 52 missões, retomada, teclado, toque, câmera, radar, retorno à posição visitada, interrupções do voo, som, atalho M, ajustes, reinício confirmado, ausência de armazenamento, voz ou áudio, auditoria axe e telas menores. Cobrir também entrada por perfil, criação e exclusão de sala, remoção de aluno, sincronização e isolamento do progresso entre abas e salas. No retorno de missão, comparar a posição efetiva anterior à entrada com a posição restaurada. Uma auditoria automatizada não substitui avaliação manual ou pedagógica.

Para alterações nas salas, executar as suítes afetadas de `src/infrastructure/firebase/rooms.test.ts` e `src/pages/students/room-sync.test.ts`, além dos testes de sessão, persistência e rotas pertinentes. Testes com mocks estabelecem o comportamento local, sem comprovar permissões ou serviços em produção.

Validar mudanças em `database.rules.json` com dados fictícios nos emuladores locais de Auth e Database, definidos em `firebase.json` (portas 9099 e 19000), usando:

```sh
npx --yes firebase-tools@14 emulators:exec --project demo-orbita --only auth,database "node scripts/test-database-rules.mjs"
```

O script exercita permissões e validação sem usar a base de produção. Executar testes com serviços reais somente quando fizerem parte do escopo autorizado; não enviar nomes reais para validar alterações locais.

Em alterações apenas de documentação, verificar os caminhos, comandos e afirmações contra os arquivos atuais e conferir a formatação dos arquivos modificados. Informar verificações executadas e limitações reais, sem afirmar que testes não executados passaram.

## Commits e pull requests

Usar títulos curtos no imperativo, como `Add guided algebra mission`. Descrever comportamento, validação, referências a issues quando existirem e capturas de tela para mudanças visuais. Verificar a disponibilidade e o estado do Git antes de criar commits ou pull requests; esta cópia local pode não conter metadados de repositório.

## Catálogo de questões por sala

- A área do professor possui as seções Alunos e Questões. Os componentes de autoria e consulta pertencem a `src/features/questions/`; o carregamento e as gravações pertencem ao painel da sala.
- `src/game/room-catalog.ts` define catálogo, revisão, serialização e validação. O registro `rooms/{roomId}/catalog` contém revisão e as listas dos três setores serializadas como strings JSON para preservar arrays vazios no Realtime Database. Não criar novos setores.
- Novas salas recebem o catálogo padrão atomicamente com metadados e índice de nome. Salas antigas sem catálogo usam o padrão até a primeira alteração. Escritas usam ETag e revisão; conflitos exigem recarregar antes de repetir a alteração.
- O aluno carrega e valida o catálogo uma vez antes do registro na sala. A cópia da partida fica em `StudentRoom.missions`, em memória. Não acrescentar assinaturas ou polling de questões nos alunos. Sair da sala limpa a sessão em memória; receber outra revisão exige nova entrada. Saves não contêm o catálogo.
- Regras puras aceitam o catálogo como argumento. As telas usam o contexto de catálogo da partida. Os padrões dos argumentos mantêm compatibilidade com testes e uso isolado, mas o jogo da sala deve fornecer suas próprias missões.
- A autoria aceita os quatro formatos existentes; a criação guiada permanece fixa em `2 × x + 4`. Montagens validam peças e equivalência algébrica sem `eval`, inclusive peças repetidas. Não mudar o catálogo padrão ao personalizar uma sala.
- Exclusões preservam respostas remotas e conclusões históricas por ID. Ao reencontrar um aluno, acrescentar missões ausentes sem sobrescrever tentativas. Totais, mapas e desbloqueios consideram somente a cópia da partida. Setores e salas vazios são válidos.
- Revisar regras e validadores em conjunto. Publicar as regras separadamente do frontend; não afirmar que a configuração remota foi atualizada com base em testes locais.
