---
name: frontend-react-design
description: >-
  Aplicar convenções de legibilidade, componentes, props, contextos e estrutura modular ao
  implementar, revisar ou refatorar frontends React e TypeScript. Usar para organização de
  código React, separação de componentes, hooks e contextos, redução de prop drilling e
  verificação de complexidade com CodeMetrics. Não se destina a design gráfico ou branding.
---

# Frontend React Design

Aplicar as convenções abaixo ao código frontend solicitado, mantendo o projeto claro e legível para humanos. A skill orienta implementação e revisão; sua invocação não amplia a tarefa para uma reorganização integral do repositório.

## Idioma do código

- Escrever código sempre em **inglês americano (en-US)**: nomes de variáveis, funções, métodos, componentes, hooks, contextos, interfaces, tipos, propriedades, arquivos, pastas e utilidades.
- Escrever comentários, JSDoc, descrições de testes, logs e mensagens técnicas internas em inglês americano. Usar a grafia americana, como `color`, `behavior` e `initialize`.
- Manter textos apresentados ao usuário, conteúdo de negócio e traduções no idioma definido pelo produto. A regra de idioma do código não autoriza traduzir a interface.
- Em contratos externos ou persistidos e integrações existentes, preservar os nomes exigidos pelo contrato. Renomear identificadores legados dentro do escopo solicitado, verificando referências e compatibilidade.

## Legibilidade e formatação

- Inserir uma linha em branco após declarações de variáveis e após definições de funções. Dentro das funções, separar as declarações iniciais da lógica seguinte por uma linha em branco.
- Quebrar a declaração de objetos com mais de duas propriedades em múltiplas linhas, com uma propriedade por linha.
- Formatar os arquivos alterados com as ferramentas configuradas no projeto. Usar o formatter existente quando o linter não aplicar formatação; executar a verificação do linter e respeitar sua configuração.
- Evitar alterações de configuração ou formatação em arquivos fora do escopo apenas para aplicar estas convenções.

## Componentes e contratos de props

- Declarar apenas um componente React por arquivo. Ao dividir um componente, criar arquivos para os componentes menores na mesma pasta da funcionalidade.
- Avaliar responsabilidades antes de separar a tela visualmente. Um componente que busca dados, controla filtros, renderiza gráficos e resumos, trata carregamento e erros e executa ações acumula motivos independentes para mudar.
- Aplicar responsabilidade única: dar a cada componente uma finalidade clara, que permita entender, testar e evoluir seu comportamento sem conhecer todos os detalhes da funcionalidade.
- Fazer o componente pai orquestrar a composição e conectar as partes. Delegar a cada componente ou hook a lógica que pertence à sua responsabilidade, em vez de apenas mover JSX e manter toda a lógica concentrada no pai.
- Aplicar Open/Closed por composição: ao acrescentar uma responsabilidade nova, preferir um componente dedicado integrado ao orquestrador, preservando contratos dos componentes estabilizados quando possível. Isso não impede mudanças necessárias à correção ou evolução solicitada.
- Usar a extração para reduzir acoplamento e esclarecer responsabilidades; a quantidade de arquivos, isoladamente, não é uma medida de boa arquitetura.
- Preferir interfaces nomeadas para props, como `DashboardFiltersProps`, em vez de objetos literais anotados diretamente nos parâmetros. Não criar interfaces vazias para componentes sem props.
- Manter contratos de entrada claros, com os dados e callbacks que o componente utiliza.

Exemplo de decomposição por responsabilidade, com um arquivo por componente:

```text
Dashboard.tsx
DashboardFilters.tsx
DashboardSummaryCards.tsx
DashboardCharts.tsx
DashboardActions.tsx
```

`Dashboard` organiza a funcionalidade; os demais componentes concentram o comportamento e a apresentação que lhes cabem. A divisão deve seguir as responsabilidades reais da tarefa, e não reproduzir esse conjunto de arquivos em qualquer tela.

## Contextos, fonte de verdade e prop drilling

- Preferir props para compartilhar dados entre um pai e seu filho direto. Nesse cenário, o pai já pode ser a fonte de verdade e um contexto costuma acrescentar complexidade desnecessária.
- Quando os mesmos dados atravessarem mais de um nível, avaliar se os componentes intermediários apenas repassam propriedades que não usam. Esse repasse incidental é um sinal para considerar contexto, não uma obrigação de criá-lo.
- Escolher Context API para organizar a responsabilidade sobre dados compartilhados e o acesso à sua fonte de verdade. Não duplicar o mesmo estado em providers e componentes locais apenas para viabilizar essa troca.
- Fazer os consumidores lerem o contexto no ponto em que precisam dos dados. Evitar tornar componentes intermediários dependentes de informações que não participam de sua responsabilidade.
- Comparar props, composição e contexto observando quem possui o estado, quem o consome, a frequência de atualização e o custo de introduzir e manter providers. Não transformar cada grupo de props em um contexto.
- Manter o provider perto da funcionalidade que o utiliza. Compartilhá-lo entre módulos somente quando essa responsabilidade realmente atravessar módulos.

Exemplo de repasse incidental:

```text
App(user)
  Dashboard(user)
    Sidebar(user)
      Avatar(user)
```

Se apenas `Avatar` consome `user`, um `UserProvider` pode expor o estado a um hook `useUser`, consumido por `Avatar`, dispensando o repasse por `Dashboard` e `Sidebar`. Se `Dashboard` ou `Sidebar` também precisarem desses dados, deverão consumi-los explicitamente.

### Renderizações e React Compiler

Context organiza responsabilidades; ganhos de desempenho dependem da árvore e das atualizações reais. Uma alteração no valor do provider pode renderizar novamente os componentes que consomem aquele contexto, inclusive consumidores envolvidos em `memo`. Evitar providers amplos que agrupem valores sem relação e mudem frequentemente; dividir responsabilidades quando houver necessidade demonstrável.

Verificar a configuração de build antes de considerar o React Compiler ativo. Usar React 19, por si só, não comprova que o compilador esteja instalado e habilitado. Quando ativo, ele pode memoizar componentes intermediários sem dependência do valor atualizado, mas isso não dispensa avaliar os consumidores do contexto nem garante ganhos por trocar props por contexto. Medir gargalos antes de acrescentar memoização ou alterar a arquitetura apenas por desempenho.

## Estrutura do projeto

Adotar esta base para projetos novos ou quando a tarefa incluir a organização estrutural:

```text
src/
  app/
    routes/        # Frontend route declarations
  components/      # Reusable UI primitives, such as buttons and inputs
  modules/         # Features and business rules
    feature-name/
      hooks/       # Feature-specific hooks
      contexts/    # Feature-specific contexts
  pages/           # Route entry points
  shared/
    hooks/         # Hooks used across modules
    contexts/      # Contexts used across modules
    utils/         # Utilities independent of a specific feature
```

- Separar hooks e contextos em pastas próprias dentro do módulo que os utiliza.
- Mover para `src/shared/hooks`, `src/shared/contexts` ou `src/shared/utils` apenas o que for utilizado em mais de um módulo e não pertencer diretamente a uma funcionalidade específica.
- Colocar um método utilitário por arquivo em `utils`, com um nome que indique seu propósito. Não usar `shared` como depósito de regras de negócio de um módulo.
- Preservar as fronteiras funcionais do projeto ao extrair componentes menores. Uma mudança localizada não exige migrar toda a estrutura existente para esta base.

## React e desempenho

Consultar a skill **`vercel-react-best-practices`** quando estiver disponível para orientar decisões de renderização, estado, efeitos, carregamento de dados e organização de imports. Combinar suas recomendações de desempenho com as convenções estruturais desta skill e as escolhas explícitas do usuário.

Se essa skill não estiver disponível, informar a limitação quando relevante e continuar com as disposições deste documento; não afirmar que foi consultada nem instalar dependências por conta da referência.

## Complexidade com CodeMetrics

- Usar o motor do **CodeMetrics 1.26.1** para medir os métodos e componentes envolvidos. Confirmar a versão e as configurações realmente utilizadas.
- Procurar primeiro comandos e integrações existentes no projeto, como `metrics` ou `metrics:check`, e verificar se executam esse motor.
- Considerar que o CodeMetrics mede também construções JSX, retornos e funções internas. A regra de complexidade ciclomática do ESLint não substitui essa verificação.
- Usar o limite definido pelo projeto ou pelo usuário. A versão exigida é 1.26.1; esta skill não estabelece um teto numérico universal.
- Reduzir complexidade distribuindo responsabilidades entre componentes, hooks e utilidades com propósito claro. Preservar o comportamento e medir também as rotinas extraídas.
- Não diminuir pesos, ignorar métodos ou trocar a métrica apenas para melhorar o resultado.
- Se o motor exigido não estiver disponível, distinguir essa limitação das verificações executadas. Não relatar a medição como aprovada sem realizá-la.

## Aplicação e entrega

1. Inspecionar a estrutura, as configurações de lint/formatação e os comandos disponíveis, além dos componentes e consumidores afetados pela tarefa.
2. Implementar ou revisar o comportamento solicitado usando estas convenções; escolher contextos com base no fluxo real de dados.
3. Formatar os arquivos alterados, executar as verificações pertinentes ao comportamento e medir a complexidade com o motor indicado quando disponível.
4. Informar as mudanças relevantes, as verificações executadas e eventuais limites de validação.
