# Percurso pedagógico

## Objetivo e referências

Favorecer a compreensão e aplicação do valor numérico de expressões algébricas com contextos visuais curtos. O recorte da BNCC fornecido contém as páginas impressas 306–307 e 312–313; a EF08MA06 orienta resolver e elaborar problemas utilizando propriedades das operações. A professora Heidi descreve dificuldade em relacionar o conteúdo aprendido à aplicação e solicita expressões algébricas no 8º ano.

O jogo oferece apoios sem inferir diagnóstico ou prometer resultados de aprendizagem. A adequação ao aluno depende de avaliação pedagógica da professora.

## Sequência

O percurso jogável é carregado de `src/content/problems.json`, na ordem das seções e dos respectivos problemas: 22 missões na Estação de lançamento, 15 na Oficina orbital e 15 na Base de exploração. Os 37 exercícios importados precedem as cinco missões originais de cada setor. Eles acrescentam operações e números que faltam ao lançamento, equações com x à oficina e equações com incógnitas nos dois lados, parênteses e frações à base. O trabalho de equações usa a EF07MA18 como referência.

A tabela abaixo descreve as 15 missões originais por identificador estável; a posição exibida no jogo depende da ordem do JSON.

| Setor      | Missão                          | Aprendizagem                                         |
| ---------- | ------------------------------- | ---------------------------------------------------- |
| Lançamento | `launch-1` Energia para decolar | Contar grupos iguais; pré-requisito                  |
| Lançamento | `launch-2` Mais um tripulante   | Perceber variação do total; apoio EF07MA13           |
| Lançamento | `launch-3` Uma letra na equipe  | Identificar uma variável; EF07MA13                   |
| Lançamento | `launch-4` Monte o plano        | Representar multiplicação por uma variável; EF07MA13 |
| Lançamento | `launch-5` Prontos para partir  | Substituir x e calcular; EF08MA06                    |
| Oficina    | `workshop-1` Reserva de energia | Substituição em adição; EF08MA06                     |
| Oficina    | `workshop-2` Motores em dobro   | Entender 2x como 2 × x; EF08MA06                     |
| Oficina    | `workshop-3` Carga extra        | Multiplicar antes de somar; EF08MA06                 |
| Oficina    | `workshop-4` Kits de reparo     | Resolver parênteses primeiro; EF08MA06               |
| Oficina    | `workshop-5` Sinal restaurado   | Substituição e prioridade; EF08MA06                  |
| Base       | `base-1` Rotas equivalentes     | Comutatividade; EF08MA06                             |
| Base       | `base-2` Distribua os recursos  | Distributividade; EF08MA06                           |
| Base       | `base-3` Confirme a descoberta  | Calcular expressão equivalente; EF08MA06             |
| Base       | `base-4` A regra da base        | Montar expressão com duas operações; EF08MA06        |
| Base       | `base-5` Sua própria missão     | Criar contexto por escolhas e resolver; EF08MA06     |

## Uso sugerido e revisão

Apresente o tutorial e deixe o aluno escolher os apoios. Pode-se realizar uma ou poucas missões por encontro; não há duração imposta. Observe como o aluno explica a relação entre objetos, números e letra. O diário registra os apoios sem penalizá-los ou tratá-los como medida de capacidade.

A primeira montagem aceita `3 × x` e `x × 3`; a segunda aceita as quatro ordens equivalentes com seus símbolos. As missões originais usam números naturais pequenos; o catálogo ampliado também inclui zero, soluções negativas e expressões com frações. Nos modelos negativos, cada objeto representa −1. Avaliar com a professora a adequação dessa representação antes de usá-la como apoio.

**Validação pedagógica pendente:** com a professora, observar compreensão dos enunciados, relação entre objetos e expressão, utilidade das dicas e transferência para outro valor de x. Ajustar contexto, quantidade de itens e progressão conforme essa observação. A conclusão no aplicativo, especialmente com solução guiada, não comprova domínio independente da habilidade.
