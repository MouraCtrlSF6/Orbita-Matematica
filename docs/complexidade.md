# Complexidade do código

Auditoria de 2 de novembro de 2026 com a extensão **CodeMetrics 1.26.1** instalada no VS Code. O runner usa o `tsmetrics-core` e o TypeScript empacotados pela própria extensão, seus pesos padrão e eventuais ajustes locais. Nenhum peso foi reduzido e nenhum método de produção foi ignorado para atingir a meta.

## Resultado

| Indicador                    | Antes | Depois |
| ---------------------------- | ----: | -----: |
| Maior complexidade           |   125 |      7 |
| Unidades visíveis acima de 7 |    40 |      0 |

O escopo é todo o código TypeScript e TSX de produção em `src/`. Os números incluem funções, callbacks, métodos, getters, construtores e agregados visíveis da extensão, como classes e enums. Testes e ferramentas de desenvolvimento ficam fora desse escopo. O CodeMetrics soma também JSX, retornos e funções internas; esses valores não equivalem à regra de complexidade ciclomática do ESLint.

| Função principal      | Antes | Depois |
| --------------------- | ----: | -----: |
| `SpaceFlight`         |   125 |      7 |
| `App`                 |   115 |      4 |
| `ExpeditionMap`       |    66 |      7 |
| `Tutorial`            |    60 |      6 |
| `MissionScreen`       |    59 |      5 |
| `isMission`           |    55 |      4 |
| `gameReducer`         |    31 |      3 |
| `useMission`          |    29 |      5 |
| `createThrusterSound` |    27 |      2 |
| `parseSave`           |    21 |      7 |
| `useNarration`        |    16 |      3 |

Esses valores se referem às funções principais; as rotinas extraídas também foram medidas e ficaram em até 7. Os relatórios completos estão em `artifacts/complexity-before.json` e `artifacts/complexity-after.json`.

## Organização adotada

- Separar a simulação e os eventos de voo da câmera, radar, destinos e painéis React. As posições transitórias continuam fora do estado de renderização.
- Separar composição do aplicativo, navegação, foco, telas e layout. Isolar controles e seções do tutorial, das missões, do diário e dos ajustes.
- Manter regras de matemática, ações do reducer, validação de dados externos e adaptação do armazenamento em rotinas com responsabilidades delimitadas.
- Preservar representações visuais estáticas como elementos JSX compartilhados, evitando recriá-las em cada renderização.
- Preservar catálogo, sequência, limites de dicas e formato de persistência. Registros históricos continuam aceitos.

## Repetir a verificação

```powershell
npm run metrics
npm run metrics:check
npm run metrics -- --json
```

`metrics:check` retorna código de falha quando encontra complexidade maior que 7. A extensão precisa estar instalada em `~/.vscode/extensions`; para outra instalação, informe o diretório pelo ambiente `CODEMETRICS_EXTENSION`. O runner lê os ajustes CodeMetrics de `Code/User/settings.json` e `.vscode/settings.json` quando disponíveis. Uma atualização incompatível do formato do pacote da extensão exige adaptar o runner.

## Validação

- 47 testes Vitest passaram, incluindo respostas matemáticas independentes, catálogo inválido, persistência e interações de missão.
- 17 percursos Playwright passaram com três workers, incluindo as 52 missões, câmera, retomada, teclado, toque, som, atalho M, telas menores e auditoria axe.
- O teste de retorno da nave compara a posição efetiva anterior à entrada na missão com a posição restaurada, em vez de presumir uma coordenada aproximada de chegada.
- ESLint, TypeScript/build, Prettier e a verificação CodeMetrics foram executados. A auditoria automatizada de acessibilidade não substitui revisão manual ou pedagógica.
