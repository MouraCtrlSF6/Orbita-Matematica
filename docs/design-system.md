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

Os ícones comuns são componentes de [Radix Icons](https://www.radix-ui.com/icons), via `@radix-ui/react-icons`. `Icon` preserva o contrato `IconName` e o tamanho solicitado, traduzindo os nomes existentes para os equivalentes disponíveis na biblioteca. Chevron, seleção, estado indeterminado, fechamento e som também usam a biblioteca. Ícones decorativos recebem `aria-hidden`; o nome acessível fica no controle. O símbolo orbital da marca e os desenhos do cenário, nave, destinos e radar mantêm seus SVGs específicos, sem equivalente direto no catálogo de ícones.

`Collapsible` fica em `src/components/Collapsible/Collapsible.tsx`. Recebe `title`, `children`, `open`/`defaultOpen`, `onOpenChange`, `disabled`, `className`, `triggerProps` e `contentProps`. `CollapsibleVariant`, em `Collapsible/collapsible-styles.ts`, oferece `Default` (borda de seleção e raio de opção), `Card` (superfície branca, borda e raio de card) e `Ghost` (sem borda). Todas usam os tokens existentes, gatilho com altura mínima de `2.75rem`, indicador de expansão e foco visível, sem animação.

O gatilho é um botão nativo com `type="button"`, `aria-expanded` e `aria-controls` gerenciados pelo Radix; Enter e espaço alternam a expansão. `title` deve conter texto ou conteúdo não interativo. Ações como remover um aluno ou excluir uma questão ficam no conteúdo, fora do botão. Refs e atributos específicos podem ser passados por `triggerProps` e `contentProps`; props de Root, incluindo `ref`, são encaminhadas pelo componente.

Por padrão, o conteúdo interno é desmontado ao fechar. `keepMounted` preserva seus campos e expansões internas e o oculta com `data-[state=closed]:hidden`, removendo os controles fechados da navegação por teclado e da árvore de acessibilidade. O acompanhamento usa essa opção para preservar setores e missões abertos ao recolher um aluno; as questões usam a variante `Card`.

```tsx
import { Collapsible } from '../components/Collapsible/Collapsible';
import { CollapsibleVariant } from '../components/Collapsible/collapsible-styles';

<Collapsible title="Detalhes da questão" variant={CollapsibleVariant.Card}>
  <p>Enunciado e resposta esperada.</p>
</Collapsible>;
```

`ControlSize` oferece `Small`, `Medium` (padrão) e `Large`. Botões e campos mantêm altura mínima de `2.75rem`; o checkbox dimensiona o indicador dentro de um rótulo com essa altura mínima. `Input` e `Select` com `Invalid` expõem `aria-invalid`; fornecer o texto de erro por `aria-describedby` (no Select, via `triggerProps`). `Input` precisa de um `<label>` associado ou nome acessível explícito. `label` no Select e RadioGroup fornece o nome acessível; renderizar também um rótulo visível quando o contexto não o fornecer.

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

## Verificação

Além dos testes de comportamento, comparar as telas com as referências visuais anteriores em 390, 700, 1000 e 1440px. O teste `e2e/typography.spec.ts` verifica que fonte e altura dos controles acompanham o aumento da fonte raiz e que a entrada e o tutorial permanecem utilizáveis em tela estreita. Essas verificações não substituem avaliação manual ou pedagógica.

Nesta revisão passaram 56 testes unitários, 21 percursos de comportamento no navegador e uma comparação pontual de 44 capturas com as referências anteriores. Também passaram lint, build, formatação dos arquivos alterados e CodeMetrics 1.26.1, com máximo 7 e nenhuma unidade acima do limite. A comparação visual pontual não foi incorporada à suíte permanente.
