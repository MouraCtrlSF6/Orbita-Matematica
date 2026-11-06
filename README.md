# Órbita Matemática

Jogo educativo em React para explorar expressões algébricas no 8º ano. A expedição espacial contém tutorial interativo, três setores e um catálogo padrão de 52 missões, com enunciados curtos, objetos visuais, pistas progressivas e criação guiada de um problema.

## Explorar com a nave

O mapa do universo apresenta os três setores. Use as **setas ou WASD** com a área de pilotagem focada para mover a nave; ao soltar, ela para. Aproxime-se de um setor e pressione **Enter** ou o botão **Entrar**. Dentro dele, visite planetas, luas e asteroides: cada destino representa uma missão do catálogo. A câmera acompanha a nave, o radar mostra os destinos e sua posição, e uma seta indica a próxima missão.

Concluir uma missão libera a seguinte. **Continuar exploração** e **Voltar ao setor** devolvem a nave à posição da visita, sem abrir automaticamente outra pergunta. Ao concluir o setor, volte ao universo para visitar o próximo. Setores e desafios bloqueados continuam identificados no mapa; é possível voar livremente dentro do setor liberado e revisitar missões concluídas.

Em telas de toque, mantenha pressionados os botões de direção e use **Entrar**. A opção **Destinos em lista** oferece acesso direto aos destinos liberados sem exigir pilotagem. Tab sai da área de voo. Abrir ajustes, mudar de tela ou perder foco interrompe o movimento. O tutorial inclui uma prática opcional de pilotagem antes da introdução à álgebra.

Um som suave de propulsão acompanha o movimento da nave e vem ligado por padrão. Use o botão fixo no canto inferior direito da área de pilotagem para ligar ou desligar o som, ou altere **Som da nave** nos ajustes; os dois controles compartilham a preferência salva neste navegador. O efeito é gerado localmente após uma interação de pilotagem, sem baixar arquivos de áudio, e para ao interromper o voo. Se o navegador não oferecer ou permitir áudio, a navegação continua funcionando.

Pressione **M** para mutar ou desmutar o som da nave. O atalho compartilha a preferência do botão e dos ajustes; ele não é acionado enquanto você digita em campos, mantém a tecla pressionada ou usa combinações como Ctrl+M.

As posições ficam somente em memória durante a sessão. Ao entrar novamente com a opção de continuar marcada, o jogo abre no universo. **Retomar exploração** leva ao setor e às proximidades da próxima missão pendente. Reiniciar a expedição também limpa as posições da sessão.

## Executar localmente

Requer Node.js **20.19+ ou 22.12+** e npm. Na pasta do projeto:

```powershell
npm ci
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://127.0.0.1:5173/`. Não abra `index.html` diretamente pelo explorador de arquivos.

| Comando              | Finalidade                                         |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Servidor local de desenvolvimento                  |
| `npm run build`      | Verificação TypeScript e build estático em `dist/` |
| `npm run preview`    | Servir o build para revisão local                  |
| `npm run lint`       | Verificar TypeScript, React Hooks e Fast Refresh   |
| `npm test`           | Testar regras, persistência e componentes          |
| `npm run test:watch` | Executar testes durante o desenvolvimento          |
| `npm run test:e2e`   | Executar percursos de navegador com Playwright     |

Use `npm run format:check` para verificar a formatação com Prettier e `npm run format` para aplicá-la.

Antes dos testes de navegador, execute `npx playwright install chromium`. Os testes iniciam o servidor automaticamente ou reutilizam a prévia local na porta 5173. Para rodar uma suíte: `npm test -- src/game/game.test.ts`.

## Rotas e sessão local

- `/sign` é a tela inicial para escolher o perfil.
- `/students` pede o nome da sala aberta e o nome completo. Depois de confirmar o registro, abre o jogo.
- `/teachers` permite escolher o nome da sala e acompanha os alunos, as missões e as respostas em tempo real. Abra o registro de um aluno e use **Remover aluno** para apagá-lo da sala. O jogo continua aberto para o aluno e os envios da sessão removida são bloqueados. Ao fim da aula, use **Excluir sala** para apagar os registros da turma e liberar o nome.

Compartilhe o nome exibido no painel. A busca ignora maiúsculas, acentos e espaços excedentes. O nome normalizado aceita de 3 a 48 caracteres, com letras, números, espaços e hífens.

O contexto global mantém o perfil, o identificador local e a sala em memória. Recarregar volta à criação ou entrada da sala. Exclua a sala antes de fechar ou recarregar o painel, pois a identidade anônima que possui a sala também está em memória. Sair da rota encerra a assinatura do banco.

O Firebase recebe o nome, o setor atual, as conclusões, os apoios usados e as respostas submetidas durante a aula. Por padrão, cada entrada começa com progresso vazio. Para retomar após recarregar, informe o nome da mesma sala na mesma aba e marque **Continuar meu progresso desta aba nesta sala**. A retomada importa conclusões e apoios daquele save. O nome e as respostas enviadas ficam fora do save. Uma falha de rede mantém as atualizações pendentes em memória, e recarregar pode descartá-las. Reiniciar a expedição apaga o progresso local e preserva o histórico já registrado na sala.

O SDK do Firebase é inicializado quando `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID` e `VITE_FIREBASE_APP_ID` estão disponíveis. Use o `.env` na raiz para o desenvolvimento local. Para habilitar o SDK no GitHub Pages, forneça as variáveis `VITE_FIREBASE_*` ao passo de build do GitHub Actions. O Vite inclui essa configuração pública no JavaScript entregue ao navegador.

Para usar salas, configure `VITE_FIREBASE_DATABASE_URL` com a URL do Realtime Database, habilite o provedor **Anônimo** no Firebase Authentication e publique o conteúdo de [database.rules.json](database.rules.json) na aba **Regras** do banco. O App Check fica para uma etapa posterior.

As regras permitem leitura pública de todo o banco, incluindo nomes, progresso e respostas. A escrita exige autenticação e segue as permissões da sala.

Para verificar as permissões localmente com dados fictícios, execute:

```sh
npx --yes firebase-tools@14 emulators:exec --project demo-orbita --only auth,database "node scripts/test-database-rules.mjs"
```

## Organização

- `src/content/`: setores e missões tipadas, objetivos, habilidades, dicas e explicações.
- `src/game/`: matemática, progresso, contratos e reducer puro, sem React ou APIs do navegador.
- `src/infrastructure/`: leitura validada e gravação versionada do progresso local.
- `src/features/`: mapa, tutorial, desafios, diário e ajustes; cada componente tem uma pasta própria e seus filhos exclusivos ficam em subpastas, refletindo a composição da interface.
- `src/pages/`: páginas de seleção, aluno e professor, com suas entradas HTML.
- `src/app/routes/`: configuração e teste da navegação.
- `src/app/contexts/`: contexto de sessão e seu teste.
- `hooks/`, `contexts/` e `utils/`: arquivos privados dentro da pasta do componente responsável; arquivos usados por vários ramos ficam no escopo comum mais próximo.
- `src/components/`: ícones e ilustrações SVG compartilhadas.
- `public/`: arquivos estáticos. As fontes são empacotadas localmente pelo npm.
- `e2e/`: testes de navegação. Testes unitários ficam próximos ao código testado.

Por exemplo, os controles e a lista de destinos pertencem a `PilotActions`:

```text
src/features/map/SpaceFlight/FlightPanels/PilotActions/
├── PilotActions.tsx
├── DestinationList/
│   ├── DestinationList.tsx
│   └── DestinationLinks/
│       ├── DestinationLinks.tsx
│       └── DestinationLink/
│           └── DestinationLink.tsx
└── FlightControls/
    ├── FlightControls.tsx
    └── FlightControl/
        └── FlightControl.tsx
```

Componentes compartilhados entre funcionalidades, como `SpaceFlight` e `ObjectModel`, permanecem na raiz da funcionalidade responsável, com seus próprios descendentes. As pastas de domínio, conteúdo e infraestrutura mantêm suas responsabilidades.

## Estilos e design system

O Tailwind CSS 4 é compilado pelo plugin `@tailwindcss/vite`, sem dependência de CDN. A configuração fica em `src/styles/design-system.css`, com `@theme` para cores, fontes, tamanhos de texto, raios, breakpoints e a animação de flutuação. O arquivo também define as variantes `ds-*` para botões, estados, setores, exploração, texto ampliado e movimento reduzido. No Tailwind 4, essa configuração é feita em CSS, sem `tailwind.config.js`.

Os componentes usam utilitários diretamente em `className`, incluindo variantes de estado e responsividade. Classes identificadoras como `flight-viewport` e `space-destination` permanecem para os controles, testes e seletores de contexto, sem folhas de estilo por funcionalidade. Manter os nomes completos dos utilitários no código para que o Tailwind possa detectá-los; não montar nomes de classes por interpolação de fragmentos.

Somente `src/styles.css` e `src/styles/design-system.css` contêm CSS. O primeiro reúne imports, reset, tipografia global, foco, elementos nativos, layout de `main` e preferências globais de acessibilidade; o segundo reúne os tokens, variantes e keyframes. O Preflight fica desativado para preservar o reset existente. Gradientes, sombras, transformações e pseudo-elementos específicos usam utilitários e variantes em `className`.

Preferir `rem` para tipografia, espaçamentos, dimensões, raios e efeitos da interface. A raiz usa `100%`, respeitando a preferência do navegador; o corpo usa `text-root` (`0.9375rem`), equivalente aos 15px anteriores quando a fonte padrão é 16px. A escala `--spacing: 0.25rem` permite utilitários como `p-6` e `gap-3`. Tamanhos de texto e raios recorrentes têm tokens nomeados no tema. Bordas finas de 1px, coordenadas da simulação e unidades internas de SVG são exceções intencionais.

Os breakpoints também usam `rem`: `43.75rem`, `62.5rem`, `78.125rem` e `100rem`. Em media queries, essas unidades dependem do tamanho inicial de fonte do navegador. As variantes `ds-down-desktop`, `ds-down-tablet`, `ds-down-mobile` e `ds-up-wide` preservam os limites inclusivos e, com a preferência padrão, os cortes anteriores de 700, 1000, 1250 e 1600px. Veja [a revisão do design system](docs/design-system.md) para as decisões, exceções e oportunidades de manutenção.

Ao alterar estilos, reutilize os tokens e variantes existentes, preserve os efeitos e valide teclado, foco, texto ampliado e movimento reduzido. O tema não altera as regras de progressão nem os dados salvos.

## Complexidade

`npm run metrics` mede o código de produção em `src/` com o motor da extensão VS Code **CodeMetrics** instalada, incluindo seus pesos para JSX e funções internas. `npm run metrics:check` falha se alguma unidade visível ultrapassar **7**. Testes e scripts de desenvolvimento ficam fora dessa medição.

O comando requer a extensão `kisstkondoros.vscode-codemetrics` instalada em `~/.vscode/extensions`, ou o caminho dela em `CODEMETRICS_EXTENSION`. O runner usa os padrões da extensão e as opções CodeMetrics dos arquivos de ajustes do VS Code e de `.vscode/settings.json`; não altera esses arquivos. A análise depende do formato do pacote da extensão e avisa se uma versão futura deixar de ser compatível. Não é uma verificação de complexidade ciclomática do ESLint e não exige dependências adicionais no aplicativo.

Para exportar os valores, use `npm run metrics -- --json`. Veja `docs/complexidade.md` para os resultados e decisões da refatoração.

## Acrescentar conteúdo

O banco `src/content/problems.json` reúne 52 problemas na versão 3, agrupados em `sections` pelos setores do jogo:

- **Estação de lançamento (`launch`):** 22 problemas; inclui os níveis 1 e 2 do documento, com operações e números que faltam.
- **Oficina orbital (`workshop`):** 15 problemas; inclui os níveis 3 e 4, com equações com x e duas operações.
- **Base de exploração (`base`):** 15 problemas; inclui os níveis 5 e 6, com incógnitas nos dois lados, parênteses e frações.

Todos usam os campos de `Mission`. Os 37 exercícios de `docs/Equacoes_do_primeiro_grau.docx` têm enunciados curtos ambientados nos respectivos setores, alternativas (`kind: "choice"`) e a resposta do gabarito em `correctChoice`. A numeração original permanece no identificador e no título. As 15 missões existentes permanecem intactas; cada seção registra os dois arquivos de origem histórica em `sources`.

Nas equações, `formula` preserva a igualdade original, `expression` representa o lado esquerdo e `variable` contém a solução para conferir a substituição. A validação usa `correctChoice`, pois o valor do lado esquerdo pode ser diferente de x. Nos cálculos sem incógnita, `variable` é 0 e não participa da expressão. Os modelos visuais de resultados negativos usam objetos que representam −1, mantendo as quantidades de objetos não negativas.

`problems.json` é a fonte do catálogo padrão das salas. `missions.ts` importa o JSON, valida os objetos e exporta `missions` e `missionById`, preservando a ordem das seções e dos problemas. O carregamento rejeita campos inválidos, IDs repetidos e setores fora da ordem definida em `sectors.ts`. Os enunciados e apoios continuam sujeitos à revisão pedagógica com a professora.

1. Adicione uma missão à lista `problems` do setor correspondente em `src/content/problems.json`, com identificador único e estável e na ordem desejada. Informe setor, objetivo, referência curricular, enunciado, expressão, representação visual, três dicas e explicação. O catálogo preserva as três dicas; o jogo exibe somente a primeira nos setores de lançamento e oficina e as duas primeiras na base, conforme `hintLimit` em `sectors.ts`.
2. Escolha um formato existente: alternativas, resposta numérica, montagem ou criação guiada. Alternativas devem ter uma única resposta correta; montagens devem incluir as ordens matematicamente equivalentes.
3. No JSON, use nós `{ "type": "constant", "value": 3 }`, `{ "type": "variable" }` ou `{ "type": "operation", "operation": "add", "left": ..., "right": ... }`. As operações aceitas são `add`, `subtract`, `multiply` e `divide`; organize os nós para representar corretamente os parênteses e a prioridade das operações. Nunca execute texto com `eval`.
4. Novos setores entram em `src/content/sectors.ts`. Agrupe suas missões no percurso. As contagens da interface vêm dos dados e o desbloqueio é sequencial.
5. Para novos formatos ou operações, amplie os tipos e regras em `src/game/`, crie um componente específico e conecte-o ao renderizador. A criação guiada atual usa `2 × x + 4`; outra proposta de autoria requer componente próprio.
6. Acrescente resultados calculados independentemente aos testes e revise a linguagem com a professora. Preserve IDs existentes; mudanças incompatíveis de progresso exigem nova versão do armazenamento e migração explícita.

## Inclusão e privacidade

O levantamento da professora Heidi orientou o foco em **valor numérico de expressões algébricas, EF08MA06**. A introdução recupera a ideia de variável da EF07MA13. Os documentos originais estão preservados em `docs/`. Veja `docs/pedagogia.md` para a sequência e a validação pedagógica pendente.

Todos podem usar teclado, objetos visuais, dicas, texto ampliado e movimento reduzido. Não há cronômetro, perda de vidas ou competição. A leitura opcional utiliza vozes em português disponíveis no navegador; sua ausência não impede jogar. A disponibilidade de vozes e seu eventual processamento remoto dependem do navegador e do sistema.

O lançamento e a oficina oferecem a primeira dica de cada missão; a base oferece as duas primeiras. Não há botão para revelar a solução ou concluir sem responder corretamente. A explicação é apresentada após o acerto, e o diário mantém os registros históricos de conclusões guiadas.

O voo tem controle direto, sem inércia ou obstáculos punitivos. A preferência de movimento reduzido, nos ajustes ou no sistema, remove brilhos dos destinos e da nave; a câmera acompanha sem suavização. A lista de destinos permite navegar sem deslocamento contínuo. O cenário é desenhado com HTML, CSS e SVG, sem dependências adicionais de motor de jogo.

O navegador guarda conclusões, apoios e preferências no `sessionStorage`, por aba e sala, usando o formato `SavedGame.version: 1`. O save antigo compartilhado do `localStorage` fica fora da retomada porque não identifica seu dono. Em computadores compartilhados, deixe a opção de continuar desmarcada ao trocar de aluno. Armazenamento bloqueado permite continuar em memória, com aviso de que o progresso não será mantido. Ao ampliar o catálogo, conclusões válidas continuam associadas aos mesmos IDs, mesmo se novos problemas forem inseridos antes deles. As novas missões ficam pendentes e o desbloqueio exige concluir todas as anteriores.

## Publicação

O workflow do GitHub Pages publica `dist/`. O build usa caminhos relativos e inclui um `index.html` por rota para permitir links diretos e recarregamento sob o subdiretório do repositório. O servidor estático pode acrescentar a barra final ao abrir uma rota diretamente.

## Questões por sala

Após criar uma sala, o professor alterna entre **Alunos** (acompanhamento em tempo real) e **Questões**. A lista de questões é agrupada nos três setores existentes. Cada nova sala recebe uma cópia completa do catálogo padrão; o professor pode consultar os detalhes, adicionar questões ao final de um setor ou excluir questões com confirmação. Essas alterações não afetam outras salas nem o arquivo `problems.json`. Não há criação de setores, edição ou reordenação nesta versão.

O formulário oferece **Objetiva**, **Discursiva**, **Montagem de expressão** e **Criação guiada**. Objetivas têm de duas a dez alternativas, com uma única opção correta. Discursivas usam uma resposta textual cadastrada: a comparação ignora maiúsculas, espaços nas extremidades e espaços internos repetidos; `2x` e `x+x` são respostas diferentes. As questões numéricas antigas continuam usando sua expressão e aceitando somente inteiros não negativos.

O editor de expressão usa blocos e prévia matemática. A expressão é opcional nas questões objetivas e discursivas; a correção depende da resposta cadastrada. Na montagem, o professor cadastra as peças e ordena as necessárias por arraste, clique, toque ou teclado. Cada ordem usa somente peças disponíveis, respeitando suas repetições, e pode deixar peças de fora. É possível cadastrar outras ordens equivalentes, verificadas algebricamente. A expressão deriva da ordem principal. A criação guiada permanece restrita a `2 × x + 4`, com cristais ou peças e valores de x entre 2 e 4.

Título, setor, formato, enunciado, configuração da resposta e explicação são obrigatórios. Objetivo, habilidade da BNCC, até três dicas e apoio visual são opcionais. O aluno recebe somente os apoios cadastrados, respeitando o limite de dicas do setor. Recolher seções e alternar formatos preserva os rascunhos durante a edição; uma falha ao salvar preserva os campos para nova tentativa. Conferir enunciados, resultados, dicas e modelos visuais continua sendo responsabilidade pedagógica do professor.

O professor hospeda uma sala por vez. O breadcrumb acima das abas mostra o nome da sala e a seção atual; **Alunos** é a seleção inicial. Não há menu lateral de gerenciamento de múltiplas salas.

O aluno consulta as questões **uma única vez ao entrar na sala**, antes de confirmar o registro. O catálogo da partida fica em memória, separado do save. Não há assinatura nem consulta periódica de questões para alunos. Quem já está jogando mantém suas questões mesmo após alterações do professor; para recebê-las, use **Sair da sala** e entre novamente, ou recarregue e preencha a entrada. A retomada de progresso continua sendo uma escolha explícita.

Conclusões válidas são preservadas por ID, incluindo questões criadas pelo professor. Questões excluídas deixam de contar no percurso na próxima entrada, mas suas respostas históricas não são apagadas. Novas questões permanecem pendentes e seguem o desbloqueio sequencial. Setores vazios permitem passagem quando os anteriores forem concluídos; uma sala totalmente vazia continua navegável.

O banco armazena `rooms/{roomId}/catalog`, com revisão numérica e três listas de missões serializadas como strings JSON, uma por setor. Essa representação preserva listas vazias e arrays que o Realtime Database converteria ou removeria. Os clientes validam o conteúdo recebido; as regras restringem proprietário, revisão, setores e tamanho dos registros. As gravações condicionais por ETag detectam alterações concorrentes entre abas. Salas antigas sem catálogo usam os dados padrão e materializam sua cópia na primeira alteração.

**Publicação:** publique as novas regras de `database.rules.json` separadamente do frontend. O workflow do GitHub Pages não publica regras. A gravação do catálogo exige essas regras atualizadas; os registros continuam sujeitos à leitura pública já configurada no banco.
