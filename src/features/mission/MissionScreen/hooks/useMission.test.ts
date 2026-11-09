import { act, renderHook } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import { ChallengeKind } from '../../../../game/types';
import { mission } from '../../../../test/mission';
import { useMission } from './useMission';

const narration = vi.hoisted(() => ({
  speaking: false,
  speak: vi.fn(),
  stop: vi.fn(),
}));

vi.mock('./useNarration', () => ({ useNarration: () => narration }));

beforeEach(() => vi.clearAllMocks());

it('reads the visible choice labels in order instead of their internal values', () => {
  const question = {
    ...mission('launch-1'),
    choices: [
      { label: 'Seis baterias', value: 'option-1' },
      { label: 'Cinco baterias', value: 'option-2' },
    ],
  };
  const { result } = renderHook(() => useMission(question, vi.fn()));

  act(() => result.current.toggleNarration());
  const text = narration.speak.mock.calls[0][0] as string;

  expect(text).toContain('Opção A: Seis baterias\nOpção B: Cinco baterias');
  expect(text).not.toContain('option-');
});

it('pronounces both division symbols and the remaining mathematical operators', () => {
  const question = { ...mission('launch-1'), formula: '8 / 2 + 6 ÷ 3 - 1 × 2 = 4' };
  const { result } = renderHook(() => useMission(question, vi.fn()));

  act(() => result.current.toggleNarration());
  const text = narration.speak.mock.calls[0][0] as string;

  expect(text.replaceAll(/\s+/g, ' ')).toContain(
    '8 dividido por 2 mais 6 dividido por 3 menos 1 vezes 2 igual a 4',
  );
});

it('does not announce choices for a text question', () => {
  const question = { ...mission('launch-1'), kind: ChallengeKind.Text, choices: undefined };
  const { result } = renderHook(() => useMission(question, vi.fn()));

  act(() => result.current.toggleNarration());

  expect(narration.speak.mock.calls[0][0]).not.toContain('Escolha sua resposta');
});
