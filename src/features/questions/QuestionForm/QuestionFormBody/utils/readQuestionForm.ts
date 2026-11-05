import { ChallengeKind, type Expression, type Mission } from '../../../../../game/types';
import {
  creationExpression,
  expressionFormula,
  validateAuthoredMission,
} from '../../../../../game/question-authoring';

function text(form: FormData, key: string) {
  return String(form.get(key) ?? '').trim();
}
function number(form: FormData, key: string) {
  return Number(text(form, key));
}
function tokens(value: string) {
  return value.split('|').map((token) => token.trim());
}

function formatFields(form: FormData, kind: ChallengeKind): Partial<Mission> {
  if (kind === ChallengeKind.Choice) return choiceFields(form);
  if (kind !== ChallengeKind.Build) return {};
  return {
    tokens: tokens(text(form, 'tokens')),
    expectedTokens: tokens(text(form, 'expectedTokens')),
    equivalentTokens: text(form, 'equivalentTokens')
      .split('\n')
      .filter((line) => line.trim())
      .map(tokens),
  };
}

function choiceFields(form: FormData): Partial<Mission> {
  const labels = text(form, 'choices')
    .split('\n')
    .map((label) => label.trim())
    .filter(Boolean);

  if (labels.length < 2 || labels.length > 10) throw new Error('Informe de 2 a 10 alternativas.');
  return {
    choices: labels.map((label, index) => ({ label, value: `option-${index + 1}` })),
    correctChoice: `option-${number(form, 'correctChoice')}`,
  };
}

export function readQuestionForm(
  form: FormData,
  kind: ChallengeKind,
  selected: Expression,
): Mission {
  const expression = kind === ChallengeKind.Create ? creationExpression() : selected;
  const mission: Mission = {
    id: `custom-${crypto.randomUUID()}`,
    sectorId: text(form, 'sectorId'),
    kind,
    title: text(form, 'title'),
    prompt: text(form, 'prompt'),
    objective: text(form, 'objective'),
    skill: text(form, 'skill'),
    expression,
    formula: expressionFormula(expression),
    variable: number(form, 'variable'),
    hints: [text(form, 'hint1'), text(form, 'hint2'), text(form, 'hint3')],
    explanation: text(form, 'explanation'),
    visual: {
      groups: number(form, 'groups'),
      perGroup: number(form, 'perGroup'),
      extra: number(form, 'extra'),
      label: text(form, 'visualLabel'),
    },
    ...formatFields(form, kind),
  };

  return validateAuthoredMission(mission);
}
