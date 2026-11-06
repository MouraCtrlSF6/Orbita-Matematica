import { useState } from 'react';
import { expressionFormula } from '../../../../../../../game/question-authoring';
import {
  parseExpressionTokens,
  usesAvailableTokens,
} from '../../../../../../../game/token-expression';

function parsePreview(tokens: string[]) {
  try {
    return { formula: expressionFormula(parseExpressionTokens(tokens)), error: '' };
  } catch (error) {
    return { formula: '', error: String((error as Error).message) };
  }
}

function preview(tokens: string[]) {
  return tokens.length ? parsePreview(tokens) : { formula: '', error: '' };
}

function orderError(tokens: string[], available: string[] | undefined, error: string) {
  if (!available) return error;
  return usesAvailableTokens(tokens, available)
    ? error
    : 'A ordem usa peças indisponíveis ou repetidas em excesso.';
}

function canAdd(next: string[], available?: string[]) {
  if (next.length > 30) return false;
  return available ? usesAvailableTokens(next, available) : true;
}

export function useTokenEditor(available?: string[]) {
  const [tokens, setTokens] = useState<string[]>([]);
  const result = preview(tokens);
  const error = orderError(tokens, available, result.error);
  const add = (token: string) => {
    const next = [...tokens, token];

    if (canAdd(next, available)) setTokens(next);
  };

  return { tokens, setTokens, add, error, formula: result.formula };
}
