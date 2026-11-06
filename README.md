# 🚀 Órbita Matemática

<p align="center">
  <img src="public/favicon.svg" alt="Logo do Órbita Matemática: planeta roxo com um anel orbital" width="160" height="160" />
</p>

Jogo educativo de álgebra para o **8º ano**, com exploração espacial e salas de aula. Os alunos pilotam uma nave e resolvem missões; o professor personaliza as questões e acompanha o percurso da turma.

## 💡 Por que ele existe

O projeto nasceu da necessidade de aproximar os conteúdos de álgebra de sua aplicação. Propõe desafios curtos, contextos visuais e apoios que respeitam o ritmo do aluno, com foco na habilidade **EF08MA06 da BNCC**. A adequação das atividades depende da revisão pedagógica da professora.

Saiba mais no [percurso pedagógico](docs/pedagogia.md).

## 🪐 O que ele disponibiliza

- **Exploração espacial:** três setores, tutorial, radar e catálogo padrão de 52 missões, com desbloqueio progressivo.
- **Desafios variados:** alternativas, respostas numéricas, discursivas, montagem de expressões e criação guiada.
- **Área do professor:** criação de sala, acompanhamento de respostas e apoios em tempo real, inclusão e exclusão de questões e remoção de alunos.
- **Acessibilidade:** teclado, toque, destinos em lista, texto ampliado, movimento reduzido, pistas, objetos visuais e leitura opcional em voz alta.
- **Progresso por sala:** retomada opcional na mesma aba e diário de descobertas, sem cronômetro, perda de vidas ou penalização pelo uso de apoios.

Para pilotar, use **setas ou WASD** e **Enter** para entrar em destinos próximos; em telas de toque, use os botões de direção. **M** liga ou desliga o som da nave. As questões são carregadas ao entrar na sala; alterações do professor aparecem após uma nova entrada.

## 🛠️ Tecnologias e versões

Versões fixadas no `package-lock.json`:

| Tecnologia        | Versão                               |
| ----------------- | ------------------------------------ |
| React / React DOM | 19.3.1                               |
| TypeScript        | 5.9.3                                |
| Vite              | 7.3.7                                |
| React Router      | 7.18.5                               |
| Tailwind CSS      | 4.3.4                                |
| Firebase          | 13.2.0                               |
| Radix UI          | Pacotes por componente; Dialog 1.3.1 |
| Vitest            | 3.2.7                                |
| Playwright        | 1.64.1                               |
| ESLint / Prettier | 9.39.5 / 3.9.10                      |

## ⚙️ Configuração principal

1. Instale **Node.js 20.19+ na linha 20 ou 22.12+** e use npm.
2. Na raiz do projeto, execute `npm ci`.
3. Crie um `.env` com a configuração pública do seu projeto Firebase:

   ```dotenv
   VITE_FIREBASE_API_KEY=sua-chave-publica
   VITE_FIREBASE_AUTH_DOMAIN=seu-projeto.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=seu-projeto
   VITE_FIREBASE_APP_ID=seu-app-id
   VITE_FIREBASE_DATABASE_URL=https://seu-banco.firebasedatabase.app
   ```

4. Habilite o provedor **Anônimo** no Firebase Authentication e publique as [regras do Realtime Database](database.rules.json).
5. Execute `npm run dev` e abra a URL informada pelo Vite, normalmente `http://127.0.0.1:5173/`.

**Perfis:** `/sign` seleciona o perfil, `/teachers` cria e gerencia a sala e `/students` recebe o nome da sala e o nome completo do aluno.

**Sessão:** o progresso usa `sessionStorage`, por aba e sala; marque a opção de continuar para retomá-lo. A identidade anônima fica em memória: recarregar exige nova entrada e o professor não recupera automaticamente a propriedade da sala. Exclua a sala ao encerrar a aula, antes de fechar ou recarregar o painel.

**Dados:** nomes, progresso e respostas são enviados ao Firebase. As regras atuais permitem leitura pública; escritas exigem autenticação e seguem as permissões da sala. Não versione o `.env` nem inclua credenciais administrativas em variáveis `VITE_*`, que entram no JavaScript público.

**Publicação:** o build em `dist/` suporta as três rotas e subdiretórios. O [workflow do GitHub Pages](.github/workflows/jekyll-gh-pages.yml) publica o frontend; forneça as variáveis Firebase no build e publique as regras do banco separadamente.

## ▶️ Comandos

| Comando                 | Finalidade                                 |
| ----------------------- | ------------------------------------------ |
| `npm ci`                | Instalar as dependências do lockfile       |
| `npm run dev`           | Iniciar o servidor de desenvolvimento      |
| `npm run build`         | Verificar TypeScript e gerar `dist/`       |
| `npm run preview`       | Servir o build localmente                  |
| `npm run lint`          | Verificar o código com ESLint              |
| `npm test`              | Executar testes unitários e de componentes |
| `npm run test:watch`    | Manter os testes em observação             |
| `npm run test:e2e`      | Executar os percursos de navegador         |
| `npm run format:check`  | Conferir a formatação                      |
| `npm run format`        | Formatar o projeto com Prettier            |
| `npm run metrics`       | Exibir as métricas de complexidade         |
| `npm run metrics:check` | Verificar o limite de complexidade 7       |

Antes dos testes de navegador, execute `npx playwright install chromium`. As métricas exigem a extensão CodeMetrics do VS Code ou seu caminho em `CODEMETRICS_EXTENSION`; consulte [complexidade](docs/complexidade.md). Para contribuição e testes das regras nos emuladores, veja [AGENTS.md](AGENTS.md). Os estilos são descritos em [design system](docs/design-system.md).
