import { ChallengeKind, type Expression, type Mission } from '../../../../../game/types';
import {
  creationExpression,
  expressionFormula,
  validateAuthoredMission,
} from '../../../../../game/question-authoring';
import { parseExpressionTokens } from '../../../../../game/token-expression';

function text(form: FormData, key: string) {
  return String(form.get(key) ?? '').trim();
}

function number(form: FormData, key: string) {
  return Number(text(form, key));
}

function tokens(value: string) {
  return value
    .split('|')
    .map((token) => token.trim())
    .filter(Boolean);
}

function expressionFields(form: FormData, kind: ChallengeKind, selected?: Expression) {
  if (kind === ChallengeKind.Create) return creationExpression();
  const value = text(form, kind === ChallengeKind.Build ? 'expectedTokens' : 'expressionTokens');

  return value ? parseExpressionTokens(tokens(value)) : selected;
}

function formatFields(form: FormData, kind: ChallengeKind): Partial<Mission> {
  return formatReaders[kind]?.(form) ?? {};
}

const formatReaders: Partial<Record<ChallengeKind, (form: FormData) => Partial<Mission>>> = {
  [ChallengeKind.Text]: (form) => ({ expectedAnswer: text(form, 'expectedAnswer') }),
  [ChallengeKind.Choice]: choiceFields,
  [ChallengeKind.Build]: buildFields,
};

function buildFields(form: FormData): Partial<Mission> {
  return {
    tokens: tokens(text(form, 'tokens')),
    expectedTokens: tokens(text(form, 'expectedTokens')),
    equivalentTokens: form.getAll('equivalentTokens').map((value) => tokens(String(value))),
  };
}

function choiceFields(form: FormData): Partial<Mission> {
  return {
    choices: [...form.entries()]
      .filter(([key]) => key.startsWith('choice-'))
      .map(([key, label]) => ({ label: String(label).trim(), value: key.slice(7) })),
    correctChoice: text(form, 'correctChoice'),
  };
}

function visualFields(form: FormData): Partial<Mission> {
  if (!form.has('visualEnabled')) return {};
  return {
    visual: {
      groups: number(form, 'groups'),
      perGroup: number(form, 'perGroup'),
      extra: number(form, 'extra'),
      label: text(form, 'visualLabel'),
    },
  };
}

export function readQuestionForm(
  form: FormData,
  kind: ChallengeKind,
  selected?: Expression,
): Mission {
  const expression = expressionFields(form, kind, selected);
  const mission: Mission = {
    id: 'custom-' + crypto.randomUUID(),
    sectorId: text(form, 'sectorId'),
    kind,
    title: text(form, 'title'),
    prompt: text(form, 'prompt'),
    objective: text(form, 'objective'),
    skill: text(form, 'skill'),
    ...(expression ? { expression } : {}),
    formula: expression ? expressionFormula(expression) : '',
    variable: number(form, 'variable'),
    hints: [text(form, 'hint1'), text(form, 'hint2'), text(form, 'hint3')].filter(Boolean),
    explanation: text(form, 'explanation'),
    ...visualFields(form),
    ...formatFields(form, kind),
  };

  return validateAuthoredMission(mission);
}
