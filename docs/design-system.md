# Revisão do design system

Revisão realizada com a skill `tailwind-design-system`, considerando a implementação do Tailwind CSS 4 e a preservação da aparência existente.

## Configuração verificada

- `vite.config.ts` registra `@tailwindcss/vite`. O CSS é compilado no build, sem CDN ou configuração JavaScript de tema.
- `src/styles/design-system.css` usa `@theme` para cores semânticas, tipografia, espaçamento, raios, breakpoints e animação; `@custom-variant` descreve estados e contextos do jogo.
- `src/styles.css` importa tema e utilitários do Tailwind e reúne somente regras globais. O Preflight permanece desativado para manter o reset original.
- Os componentes usam classes completas em `className`, detectáveis pelo compilador. Estados não dependem de nomes de utilitários montados por fragmentos em tempo de execução.
- Preferências de texto ampliado, movimento reduzido, foco visível e o contexto visual da exploração continuam presentes. A exploração tem uma paleta própria; isso não representa uma opção global de modo escuro.

## Medidas e tokens

A raiz usa `font-size: 100%`. O corpo usa `text-root`, com `0.9375rem`: na preferência padrão de 16px do navegador, mantém os 15px anteriores. As antigas dimensões da interface foram divididas por 16 para conservar as proporções. A medida anterior de `1.25rem` dos cards de perfil, que dependia da raiz de 15px, foi recalibrada para `text-profile` (`1.171875rem`).

`--spacing: 0.25rem` alimenta os utilitários de espaçamento e dimensão. Usar, por exemplo, `p-6`, `gap-3` e `w-60` quando o valor pertence à escala. A tipografia e os raios recorrentes usam nomes como `text-body`, `text-page`, `text-formula`, `rounded-control` e `rounded-card`. Composições fluidas e valores específicos que preservam a arte existente podem usar valores arbitrários em `rem`, percentuais ou unidades de viewport.

A escala de leitura foi ampliada nos tokens abaixo. As equivalências consideram a fonte inicial de 16px do navegador:

| Token          | Antes             | Agora             |
| -------------- | ----------------- | ----------------- |
| `text-caption` | `0.625rem` (10px) | `0.75rem` (12px)  |
| `text-small`   | `0.75rem` (12px)  | `0.875rem` (14px) |
| `text-body`    | `0.875rem` (14px) | `1rem` (16px)     |
| `text-section` | `1rem` (16px)     | `1.125rem` (18px) |

Os breakpoints mantêm uma única unidade:

| Token     | Valor       | Equivalência com fonte inicial de 16px |
| --------- | ----------- | -------------------------------------- |
| `mobile`  | `43.75rem`  | 700px                                  |
| `tablet`  | `62.5rem`   | 1000px                                 |
| `desktop` | `78.125rem` | 1250px                                 |
| `wide`    | `100rem`    | 1600px                                 |

As variantes `ds-down-*` e `ds-up-wide` preservam comparações inclusivas. O `rem` de media queries usa a fonte inicial do navegador, enquanto o `rem` das dimensões usa a fonte calculada da raiz.

## Exceções intencionais

- Bordas finas de 1px continuam em pixels para manter o traço original.
- Posições, dimensões do mundo e transformações calculadas pelo controle de voo continuam no sistema de coordenadas em pixels da simulação. Converter esses números isoladamente alteraria câmera, radar e proximidade dos destinos.
- Coordenadas e espessuras internas de SVG pertencem ao `viewBox` ou aos contratos dos ícones. Não são uma escala de espaçamento da interface.
- Cores existentes foram preservadas. Utilitários de superfície e texto reutilizam os tokens semânticos disponíveis, sem converter a paleta para outro espaço de cores nesta alteração.

## Oportunidades de manutenção

A skill recomenda primitivos reutilizáveis com variantes tipadas. Há sequências de classes repetidas, especialmente nos botões, que podem ser extraídas para componentes compartilhados em uma refatoração específica. Isso reduz a possibilidade de divergência entre controles equivalentes.

Algumas cores locais da arte e seletores descendentes ainda usam valores arbitrários. Novas cores compartilhadas devem ganhar tokens semânticos; novos padrões recorrentes devem ganhar componentes. A existência de arte específica não justifica duplicar padrões de formulário ou de navegação.

## Verificação

Além dos testes de comportamento, comparar as telas com as referências visuais anteriores em 390, 700, 1000 e 1440px. O teste `e2e/typography.spec.ts` verifica que fonte e altura dos controles acompanham o aumento da fonte raiz e que a entrada e o tutorial permanecem utilizáveis em tela estreita. Essas verificações não substituem avaliação manual ou pedagógica.

Nesta revisão passaram 56 testes unitários, 21 percursos de comportamento no navegador e uma comparação pontual de 44 capturas com as referências anteriores. Também passaram lint, build, formatação dos arquivos alterados e CodeMetrics 1.26.1, com máximo 7 e nenhuma unidade acima do limite. A comparação visual pontual não foi incorporada à suíte permanente.
