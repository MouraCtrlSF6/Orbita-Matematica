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

Os componentes compartilhados em `src/components/` oferecem variantes tipadas com os tokens existentes. Novos controles e substituições dos padrões repetidos devem reutilizar esses componentes. Os botões de produção usam `Button`, incluindo navegação, apoios, formulários e pilotagem. `SelectField` na autoria e `CreationSelect` na criação guiada usam `Select`. Os controles internos dos primitivos continuam sob responsabilidade do Radix; botões nativos usados apenas em fixtures unitárias não fazem parte da interface de produção.

Algumas cores locais da arte e seletores descendentes ainda usam valores arbitrários. Novas cores compartilhadas devem ganhar tokens semânticos; novos padrões recorrentes devem ganhar componentes. A existência de arte específica não justifica duplicar padrões de formulário ou de navegação.

## Componentes compartilhados

`Select`, `Tabs`, `Dialog`, `Checkbox`, `RadioGroup` e `Collapsible` usam [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction), instalados por pacote. `Button` usa Radix Slot para composição com `asChild`; `Input` preserva o elemento HTML nativo. Não há tema adicional do Radix. As classes usam os tokens atuais, `class-variance-authority` organiza variantes de botão e campo, e `tailwind-merge` permite sobrescrever utilitários por `className`.

Importar cada componente diretamente de `src/components/Component/Component.tsx`, sem arquivo de reexportação. Os enums ficam nos arquivos de estilos indicados abaixo; `ControlSize` e `ControlVariant` pertencem a `src/components/utils/control-styles.ts`.

| Componente   | Configuração                                                                                               | Variantes                                                                                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`     | Props nativas, `ref`, `size`, `asChild`                                                                    | `ButtonVariant`: `Primary` (padrão), `Secondary`, `Peach`, `Danger`, `DangerSolid`, `Ghost`, `Text`, `Subtle`, `Navigation`, `Icon`, `FlightPrimary`, `FlightSecondary`, em `Button/button-styles.ts` |
| `Input`      | Props nativas, `ref`, `size`; `nativeSize` preserva o atributo HTML `size`                                 | `ControlVariant`: `Default` (padrão), `Invalid`                                                                                                                                                       |
| `Select`     | `label`, `options`, `value`/`defaultValue`, `onValueChange`, `name`, `required`, `disabled`, `size`        | `ControlVariant`: `Default` (padrão), `Invalid`                                                                                                                                                       |
| `Tabs`       | `label`, `items` com `value`, `label`, `content`, `disabled`; props de Root do Radix                       | `TabsVariant`: `Pills` (padrão), `Underline`, em `Tabs/tab-styles.ts`                                                                                                                                 |
| `Dialog`     | `title`, `description`, `trigger`, `children`, `open`/`defaultOpen`, `onOpenChange`, `closeLabel`          | `DialogVariant`: `Default` (padrão), `Wide`, em `Dialog/dialog-styles.ts`                                                                                                                             |
| `Checkbox`   | `label`, `checked`/`defaultChecked`, `onCheckedChange`, `name`, `value`, `required`, `disabled`, `size`    | `CheckboxVariant`: `Default` (padrão), `Card`, em `Checkbox/checkbox-styles.ts`                                                                                                                       |
| `RadioGroup` | `label`, `options`, `value`/`defaultValue`, `onValueChange`, `name`, `required`, `disabled`, `orientation` | `RadioGroupVariant`: `Default` (padrão), `Cards`, em `RadioGroup/radio-group-styles.ts`                                                                                                               |

`ButtonVariant.Text` atende ações de texto; `Subtle`, os apoios; `Navigation`, a barra lateral escura; e `Icon`, ações circulares com nome acessível explícito. `Danger` mantém a versão com contorno, enquanto `DangerSolid` atende confirmações destrutivas com fundo vermelho. As dimensões próprias dessas variantes são preservadas quando `size` é omitido; um `size` explícito substitui suas medidas. Classes identificadoras como `button`, `nav-item`, `subtle-button` e `icon-button` continuam disponíveis. Contextos de layout e os controles especiais de voo mantêm seus ajustes locais.

`ButtonVariant.OutlinePrimary` usa fundo transparente, contorno e texto roxos, com fundo lilás no hover. `ButtonVariant.Addition` também usa fundo transparente, com contorno em `amber-600` e texto em `amber-700` para manter o contraste; no hover, o contorno passa a `amber-700` e o fundo recebe uma cor suave. Os tokens âmbar mantêm os valores padrão do Tailwind CSS 4, registrados explicitamente porque o tema redefine a paleta. `AddButton`, em `src/components/AddButton/AddButton.tsx`, aplica a variante de inclusão e o `PlusIcon` do Radix. Sem filhos, ocupa um quadrado de `2.75rem` e exige um nome acessível; com filhos, exibe o ícone junto ao texto. A aba Questões e os controles de inclusão do formulário compartilham esse componente.

Os ícones comuns são componentes de [Radix Icons](https://www.radix-ui.com/icons), via `@radix-ui/react-icons`. `Icon` preserva o contrato `IconName` e o tamanho solicitado, traduzindo os nomes existentes para os equivalentes disponíveis na biblioteca. Chevron, seleção, estado indeterminado, fechamento e som também usam a biblioteca. Ícones decorativos recebem `aria-hidden`; o nome acessível fica no controle. O símbolo orbital da marca e os desenhos do cenário, nave, destinos e radar mantêm seus SVGs específicos, sem equivalente direto no catálogo de ícones.

`Collapsible` fica em `src/components/Collapsible/Collapsible.tsx`. Recebe `title`, `children`, `open`/`defaultOpen`, `onOpenChange`, `disabled`, `className`, `triggerProps` e `contentProps`. `CollapsibleVariant`, em `Collapsible/collapsible-styles.ts`, oferece `Default` (borda de seleção e raio de opção), `Card` (superfície branca, borda e raio de card) e `Ghost` (sem borda). Todas usam os tokens existentes, gatilho com altura mínima de `2.75rem`, indicador de expansão e foco visível. A abertura e o fechamento deslizam durante 220 ms, respeitando movimento reduzido.

O gatilho é um botão nativo com `type="button"`, `aria-expanded` e `aria-controls` gerenciados pelo Radix; Enter e espaço alternam a expansão. `title` deve conter texto ou conteúdo não interativo. Ações como remover um aluno ou excluir uma questão ficam no conteúdo, fora do botão. Refs e atributos específicos podem ser passados por `triggerProps` e `contentProps`; props de Root, incluindo `ref`, são encaminhadas pelo componente.

A prop opcional `heading` (`h2`, `h3` ou `h4`) envolve o gatilho no título semântico correspondente. Os setores de questões usam `heading="h3"`, variante `Card` e `keepMounted`, começando recolhidos e preservando os detalhes de questões já abertos.

Por padrão, o conteúdo interno é desmontado ao fechar. `keepMounted` preserva seus campos e expansões internas e o recolhe com uma transição de grid em um elemento interno, isolado da medição do Radix, removendo os controles fechados da navegação por teclado e da árvore de acessibilidade. O acompanhamento usa essa opção para preservar setores e missões abertos ao recolher um aluno; as questões usam a variante `Card`.

```tsx
import { Collapsible } from '../components/Collapsible/Collapsible';
import { CollapsibleVariant } from '../components/Collapsible/collapsible-styles';

<Collapsible title="Detalhes da questão" variant={CollapsibleVariant.Card}>
  <p>Enunciado e resposta esperada.</p>
</Collapsible>;
```

`ControlSize` oferece `Small`, `Medium` (padrão) e `Large`. Botões e campos mantêm altura mínima de `2.75rem`; o checkbox dimensiona o indicador dentro de um rótulo com essa altura mínima. `Input` e `Select` com `Invalid` expõem `aria-invalid`; fornecer o texto de erro por `aria-describedby` (no Select, via `triggerProps`). `Input` precisa de um `<label>` associado ou nome acessível explícito. `label` no Select e RadioGroup fornece o nome acessível; renderizar também um rótulo visível quando o contexto não o fornecer.

`Textarea`, em `src/components/Textarea/Textarea.tsx`, compartilha os estilos, tamanhos e estados de erro de `Input`, com props nativas, altura inicial de seis rem e redimensionamento vertical. Deve ter rótulo associado e texto de erro acessível.

O visual padrão de `Tabs` mantém o identificador `TabsVariant.Pills` por compatibilidade, mas apresenta abas sobre uma linha contínua: a ativa tem fundo lilás, texto roxo e sublinhado espesso. A variante `Underline` continua disponível. A seleção controlada, os painéis associados e a navegação por teclado permanecem sob responsabilidade do Radix.

Cada item de `Tabs` aceita `keepMounted?: boolean`, desativado por padrão. Quando ativado, o conteúdo permanece montado pelo `forceMount` do Radix e fica oculto com `data-[state=inactive]:hidden` ao sair da aba, removendo os controles ocultos do teclado e da árvore de acessibilidade. O modo padrão continua desmontando os painéis inativos.

No painel do professor, o histórico de abas visitadas ativa `keepMounted` somente após a primeira abertura de cada aba. Alunos começa selecionada; Questões carrega seu catálogo na primeira visita e preserva catálogo, rascunho, expansões e operações ao alternar as abas. O acompanhamento dos alunos continua recebendo as atualizações da sessão em tempo real. A identidade da sala reinicia os painéis; sair do painel libera seu estado. A recarga manual e a exigência de recarregar após conflito de ETag permanecem disponíveis, sem polling ou persistência adicional.

Adicionar uma questão mantém a aba Questões selecionada e substitui a listagem pelo formulário, com transição lateral. O cabeçalho passa a “Adicionar Questão”, com descrição própria e seta de retorno usando `ButtonVariant.Ghost`, sem borda e com destaque no hover. Voltar preserva o rascunho e as expansões da listagem. O foco vai para o título da visualização aberta; o painel inativo usa `inert` e `aria-hidden`, sem receber foco ou leitura assistiva. A transição respeita movimento reduzido. Após salvar, o formulário continua disponível para outra inclusão.

`Breadcrumb`, em `src/components/Breadcrumb/Breadcrumb.tsx`, recebe `items` com `id` e `label`, além de um rótulo acessível opcional para a navegação. O primeiro item recebe destaque roxo, as barras são decorativas e o último item usa `aria-current="page"`. Os itens são contextuais e não criam links. O painel do professor não exibe breadcrumb: apenas o valor do nome da sala recebe `text-primary` e negrito, mantendo o rótulo na cor normal. O botão de excluir sala fica alinhado à direita, abaixo das abas.

Na autoria, campos obrigatórios têm asterisco vermelho e os opcionais têm o sufixo `(opcional)`. As seções recolhíveis preservam campos e abrem ao encontrar um campo inválido. Blocos matemáticos oferecem seleção, remoção e movimentação por botões além de arraste. Sobre fundo lilás, usar `text-primary-hover` para manter contraste de texto pequeno.

```tsx
import { Button } from '../components/Button/Button';
import { ButtonVariant } from '../components/Button/button-styles';
import { Input } from '../components/Input/Input';
import { Select } from '../components/Select/Select';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { RadioGroup } from '../components/RadioGroup/RadioGroup';
import { Tabs } from '../components/Tabs/Tabs';
import { Dialog } from '../components/Dialog/Dialog';

<Button type="submit" variant={ButtonVariant.Primary}>
  Salvar
</Button>;
<label>
  Nome
  <Input name="name" required />
</label>;
<Select
  label="Setor"
  name="sector"
  defaultValue="launch"
  options={[{ value: 'launch', label: 'Lançamento' }]}
/>;
<Checkbox label="Continuar progresso" name="resume" />;
<RadioGroup label="Alternativas" name="answer" options={[{ value: '6', label: 'Seis' }]} />;
<Tabs
  label="Seções da sala"
  defaultValue="students"
  items={[{ value: 'students', label: 'Alunos', content: <p>Alunos da sala</p> }]}
/>;
<Dialog
  title="Ajustes"
  description="Ajuste sua experiência."
  trigger={<Button>Abrir ajustes</Button>}
>
  <p>Conteúdo do diálogo</p>
</Dialog>;
```

`Button` tem `type="button"` por padrão; formulários devem declarar `type="submit"`. Com `asChild`, fornecer um único elemento que aceite props e ref, como um link; o comportamento de desabilitação continua dependendo do elemento composto. Os controles Radix usam callbacks de valor (`onValueChange`, `onCheckedChange`), sem fabricar eventos de inputs. Checkbox aceita também `checked="indeterminate"`. Não alternar um controle entre modo controlado e não controlado.

`Select.options` usa valores não vazios e únicos, rótulos textuais e `disabled` opcional. `RadioGroup.options` usa valores únicos, rótulos React e `disabled` opcional. Select, Checkbox e RadioGroup participam de `FormData` por `name`, inclusive em formulários nativos. As abas gerenciam os vínculos entre aba e painel e a navegação por setas; `activationMode="manual"` permite ativação por Enter ou espaço.

Dialog fornece título, descrição, botão de fechamento, Escape e controle de foco pelo Radix. O `trigger` deve aceitar props e ref; quando o diálogo é aberto externamente sem trigger, usar `contentProps.onCloseAutoFocus` para direcionar a restauração de foco. Select oferece `triggerProps` e `contentProps`; Dialog oferece `contentProps`. Eventos, atributos ARIA e refs específicos dessas partes podem ser configurados por essas props.

Os portais de Select e Dialog usam `document.body` por padrão. Quando precisarem herdar preferências ou estilos limitados a um ancestral, passar `portalContainer` para um elemento nesse contexto. Os controles não adicionam animações; o botão respeita `ds-reduced-motion`, e o CSS global continua atendendo a preferência do sistema. A fixture `e2e/fixtures/components.html` é usada somente nos testes locais e não é uma entrada do build de produção.

## Accordion

`src/components/Accordion/Accordion.tsx` usa `@radix-ui/react-accordion` para agrupar seções expansíveis. Os títulos são botões gerenciados pelo Radix, com chevron de Radix Icons, foco visível, altura mínima de `2.75rem` e relações acessíveis entre gatilhos e regiões de conteúdo. A abertura e o fechamento deslizam durante 220 ms; as preferências de movimento reduzido do sistema e do jogo desativam a animação.

`AccordionVariant`, em `Accordion/accordion-styles.ts`, oferece `Default` (borda de seleção e raio de opção), `Card` (superfície branca, borda `line` e raio de card), `Ghost` (separador inferior sem moldura) e `Flight` (cores do painel de voo e foco claro). As classes usam os tokens existentes de cor, tipografia e espaçamento, sem folhas CSS específicas.

```tsx
import { Accordion } from '../components/Accordion/Accordion';
import { AccordionVariant } from '../components/Accordion/accordion-styles';

<Accordion
  label="Informações da expedição"
  type="single"
  collapsible
  variant={AccordionVariant.Card}
  items={[
    { value: 'mission', title: 'Missão', content: <p>Enunciado da missão.</p> },
    { value: 'support', title: 'Apoios', content: <p>Dicas disponíveis.</p> },
  ]}
/>;
```

`type="single"` mantém no máximo uma seção aberta e recebe `value`/`defaultValue` do tipo string; `collapsible` permite fechar a seção selecionada. Sem essa opção, ela permanece aberta até outra seção ser escolhida. `type="multiple"` recebe arrays de strings e permite abrir e fechar cada seção independentemente. `onValueChange` acompanha o tipo do modo escolhido. O estado fica no primitivo ou no chamador quando controlado; não alternar entre esses modos durante a mesma montagem.

`label` nomeia o grupo. `heading` configura o nível dos títulos de `h2` a `h6`, com `h3` por padrão. `items` aceita valores únicos e não vazios, `title`, `content`, `disabled`, `keepMounted`, `className`, `triggerProps` e `contentProps`. Os títulos devem conter texto ou conteúdo não interativo; ações ficam no corpo. A raiz recebe os demais atributos do Radix, `className` e `ref`, incluindo `disabled`, `orientation` e `dir`. `triggerProps` e `contentProps` encaminham atributos, eventos e refs às partes correspondentes.

Conteúdo fechado é desmontado por padrão. `keepMounted` preserva campos e componentes internos e recolhe a seção com uma transição de linhas de grid em um elemento interno, isolado dos estilos temporários de medição do Radix, ocultando-a ao final do fechamento e removendo-a do teclado e da árvore de acessibilidade. Sem `keepMounted`, a altura é animada com `--radix-accordion-content-height`, e o Radix aguarda o término da animação antes de desmontar o conteúdo. O espaçamento fica em um elemento interno para recolher junto do conteúdo. Enter e espaço alternam a seção; setas, Home e End movem o foco entre títulos habilitados conforme a orientação do primitivo. Os gatilhos usam `type="button"`, sem enviar formulários. Um catálogo vazio de itens é válido. Esta inclusão disponibiliza o componente compartilhado sem substituir automaticamente as listagens que usam Collapsible.

## Tooltip

`src/components/Tooltip/Tooltip.tsx` encapsula `@radix-ui/react-tooltip`, incluindo Provider, gatilho, portal, conteúdo e seta. `TooltipVariant`, em `Tooltip/tooltip-styles.ts`, oferece `Default` (fundo `ink`, texto branco), `Light` (superfície branca, borda `line`, texto `ink`) e `Flight` (painel e texto do voo). As variantes usam `rounded-control`, `text-small`, espaçamento em `rem` e os tokens existentes, sem animações adicionais.

```tsx
import { Tooltip } from '../components/Tooltip/Tooltip';
import { TooltipVariant } from '../components/Tooltip/tooltip-styles';
import { Button } from '../components/Button/Button';

<Tooltip content="Veja as informações desta missão." variant={TooltipVariant.Default}>
  <Button>Informações</Button>
</Tooltip>;
```

Fornecer um único filho focável que aceite props e ref, como `Button` ou um link. O componente usa `asChild`, sem acrescentar outro botão. Conteúdo complementar abre por foco ou ponteiro e fecha com Escape; o ponteiro pode entrar no conteúdo sem fechá-lo. Manter o nome acessível no gatilho e não colocar ações interativas ou informações essenciais exclusivamente no tooltip, especialmente para acesso por toque.

A API aceita `content`, `variant`, `className`, `open`/`defaultOpen`, `onOpenChange`, `delayDuration` e `disableHoverableContent`. Cada instância inclui seu próprio Provider, com atraso de 400ms por padrão; `providerProps` configura os tempos desse Provider. `triggerProps` encaminha atributos, eventos e ref ao gatilho. `contentProps` permite configurar `side`, `align`, afastamento, colisões, atributos ARIA, eventos e ref do conteúdo. Por padrão, o afastamento e a margem de colisão são de 8 unidades de posicionamento do Radix.

O portal usa `document.body`. `portalContainer` permite herdar o contexto de preferências de um ancestral específico. A largura é limitada pelo espaço disponível e por `18rem`, com quebra de textos longos e tratamento de colisões do Radix. Os botões de recarregar e adicionar no cabeçalho de Questões usam `Tooltip`, preservando os nomes acessíveis e sem o atributo `title` nativo.

## Verificação

`TooltipButton`, em `src/components/Tooltip/TooltipButton/TooltipButton.tsx`, compõe `Button` com o Tooltip genérico e preserva props, ref, eventos e variantes. O conteúdo usa a prop `tooltip`, o `aria-label` ou o texto do botão, nessa ordem. `AddButton` também usa essa composição. Os controles de inclusão, exclusão, seleção e ordenação de peças, limpeza e envio do formulário de questões usam esses tooltips, mantendo os nomes acessíveis nos botões. Não envolver `AddButton` ou `TooltipButton` em outro Tooltip.

Além dos testes de comportamento, comparar as telas com as referências visuais anteriores em 390, 700, 1000 e 1440px. O teste `e2e/typography.spec.ts` verifica que fonte e altura dos controles acompanham o aumento da fonte raiz e que a entrada e o tutorial permanecem utilizáveis em tela estreita. Essas verificações não substituem avaliação manual ou pedagógica.

Nesta revisão passaram 56 testes unitários, 21 percursos de comportamento no navegador e uma comparação pontual de 44 capturas com as referências anteriores. Também passaram lint, build, formatação dos arquivos alterados e CodeMetrics 1.26.1, com máximo 7 e nenhuma unidade acima do limite. A comparação visual pontual não foi incorporada à suíte permanente.

O menu de `Select` abre com deslizamento e revelação gradual durante 220 ms e fecha com deslizamento e esmaecimento. O movimento acompanha o lado disponível quando o menu abre acima do gatilho. A preferência de movimento reduzido desativa essas animações; o posicionamento, a seleção e o foco continuam sob responsabilidade do Radix.

## Confirmação de exclusão

`DeleteConfirmationDialog` compõe o `Dialog` compartilhado com um botão como `Dialog.Trigger`, ações de cancelar e confirmar, estado de envio e mensagem de erro. Abrir ou cancelar não executa a operação; somente confirmar chama `onConfirm`. Durante o envio, bloqueia novas confirmações e o fechamento. Se a operação falhar ou retornar `false`, mantém o diálogo aberto; em caso de sucesso, fecha.

`DeleteRoomDialog`, `RemoveStudentDialog` e `RemoveQuestionDialog` definem as mensagens e operações de sala, aluno e questão. A exclusão de questão preserva as respostas históricas. Seu gatilho fica à direita dos detalhes, com lixeira e o texto “Excluir questão”.
