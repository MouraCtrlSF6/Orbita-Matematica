# Órbita Matemática

Jogo educativo em React para explorar expressões algébricas no 8º ano. A expedição espacial contém tutorial interativo, três setores e 52 missões, com enunciados curtos, objetos visuais, pistas progressivas e criação guiada de um problema.

## Explorar com a nave

O mapa do universo apresenta os três setores. Use as **setas ou WASD** com a área de pilotagem focada para mover a nave; ao soltar, ela para. Aproxime-se de um setor e pressione **Enter** ou o botão **Entrar**. Dentro dele, visite planetas, luas e asteroides: cada destino representa uma missão do catálogo. A câmera acompanha a nave, o radar mostra os destinos e sua posição, e uma seta indica a próxima missão.

Concluir uma missão libera a seguinte. **Continuar exploração** e **Voltar ao setor** devolvem a nave à posição da visita, sem abrir automaticamente outra pergunta. Ao concluir o setor, volte ao universo para visitar o próximo. Setores e desafios bloqueados continuam identificados no mapa; é possível voar livremente dentro do setor liberado e revisitar missões concluídas.

Em telas de toque, mantenha pressionados os botões de direção e use **Entrar**. A opção **Destinos em lista** oferece acesso direto aos destinos liberados sem exigir pilotagem. Tab sai da área de voo. Abrir ajustes, mudar de tela ou perder foco interrompe o movimento. O tutorial inclui uma prática opcional de pilotagem antes da introdução à álgebra.

Um som suave de propulsão acompanha o movimento da nave e vem ligado por padrão. Use o botão fixo no canto inferior direito da área de pilotagem para ligar ou desligar o som, ou altere **Som da nave** nos ajustes; os dois controles compartilham a preferência salva neste navegador. O efeito é gerado localmente após uma interação de pilotagem, sem baixar arquivos de áudio, e para ao interromper o voo. Se o navegador não oferecer ou permitir áudio, a navegação continua funcionando.

Pressione **M** para mutar ou desmutar o som da nave. O atalho compartilha a preferência do botão e dos ajustes; ele não é acionado enquanto você digita em campos, mantém a tecla pressionada ou usa combinações como Ctrl+M.

As posições ficam somente em memória durante a sessão. Recarregar abre o universo; **Retomar exploração** leva ao setor e às proximidades da próxima missão pendente. O progresso anterior continua compatível com `orbita-matematica:v1` e `SavedGame.version: 1`. Reiniciar a expedição também limpa as posições da sessão.

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
- `/students` pede o UID de uma sala aberta. Depois da verificação, abre o jogo e recupera o progresso salvo no navegador.
- `/teachers` cria uma sala automaticamente e acompanha os registros de alunos em tempo real.

O contexto global mantém o perfil, o identificador local e a sala do aluno em memória. Recarregar gera uma nova sala para o professor e pede novamente o UID ao aluno. Sair da área do professor encerra a assinatura do banco. O progresso do jogo continua no navegador.

O SDK do Firebase é inicializado quando `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_PROJECT_ID` e `VITE_FIREBASE_APP_ID` estão disponíveis. Use o `.env` na raiz para o desenvolvimento local. Para habilitar o SDK no GitHub Pages, forneça as variáveis `VITE_FIREBASE_*` ao passo de build do GitHub Actions. O Vite inclui essa configuração pública no JavaScript entregue ao navegador.

Para usar salas, configure `VITE_FIREBASE_DATABASE_URL` com a URL do Realtime Database e habilite o provedor **Anônimo** no Firebase Authentication. A identidade anônima fica em memória, sem tela de login. A configuração abaixo permite criar a sala, consultar se ela está aberta e acompanhar os registros pelo painel. A escrita de registros de alunos, o encerramento de salas e o App Check ficam para etapas posteriores.

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "rooms": {
      "$roomId": {
        ".read": "auth != null && data.child('meta/ownerUid').val() === auth.uid",
        "meta": {
          ".write": "auth != null && (!data.exists() || data.child('ownerUid').val() === auth.uid) && newData.child('ownerUid').val() === auth.uid && newData.child('open').val() === true",
          "open": { ".read": "auth != null" }
        }
      }
    }
  }
}
```

## Organização

- `src/content/`: setores e missões tipadas, objetivos, habilidades, dicas e explicações.
- `src/game/`: matemática, progresso, contratos e reducer puro, sem React ou APIs do navegador.
- `src/infrastructure/`: leitura validada e gravação versionada do progresso local.
- `src/features/`: mapa, tutorial, desafios, diário e ajustes; subcomponentes ficam junto da funcionalidade.
- `src/pages/`: páginas de seleção, aluno e professor, com suas entradas HTML.
- `src/app/routes/`: configuração, estilos e teste da navegação.
- `src/app/contexts/`: contexto de sessão e seu teste.
- `hooks/`: hooks locais dentro da página, funcionalidade ou contexto responsável.
- `src/components/`: ícones e ilustrações SVG compartilhadas.
- `public/`: arquivos estáticos. As fontes são empacotadas localmente pelo npm.
- `e2e/`: testes de navegação. Testes unitários ficam próximos ao código testado.

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

`problems.json` é a fonte única das missões jogáveis. `missions.ts` importa o JSON, valida os objetos e exporta `missions` e `missionById`, preservando a ordem das seções e dos problemas. O carregamento rejeita campos inválidos, IDs repetidos e setores fora da ordem definida em `sectors.ts`. Os enunciados e apoios continuam sujeitos à revisão pedagógica com a professora.

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

O progresso guarda conclusões, apoios e preferências no `localStorage` deste navegador. O Firebase recebe os dados de criação e de acesso à sala. O jogo dispensa cadastro manual e mantém conclusões e tentativas no navegador. Em computadores compartilhados, outro usuário verá o mesmo progresso. Os ajustes permitem reiniciá-lo com confirmação. Armazenamento bloqueado permite continuar em memória, com aviso de que o progresso não será mantido. Limpar os dados do navegador também apaga o diário. Ao ampliar o catálogo, conclusões válidas continuam associadas aos mesmos IDs, mesmo se novos problemas forem inseridos antes deles. As novas missões ficam pendentes e o desbloqueio exige concluir todas as anteriores.

## Publicação

O workflow do GitHub Pages publica `dist/`. O build usa caminhos relativos e inclui um `index.html` por rota para permitir links diretos e recarregamento sob o subdiretório do repositório. O servidor estático pode acrescentar a barra final ao abrir uma rota diretamente.
