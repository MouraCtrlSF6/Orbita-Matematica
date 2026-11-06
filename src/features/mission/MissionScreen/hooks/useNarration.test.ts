import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useNarration } from './useNarration';

class TestUtterance {
  voice: { lang: string } | null = null;
  lang = '';
  rate = 1;
  onend: (() => void) | null = null;
  onerror: (() => void) | null = null;
  constructor(public text: string) {}
}

afterEach(() => vi.unstubAllGlobals());

describe('optional Portuguese narration', () => {
  it('explains when no Portuguese voice is available and does not attempt playback', () => {
    const speak = vi.fn();
    vi.stubGlobal('SpeechSynthesisUtterance', TestUtterance);
    vi.stubGlobal('speechSynthesis', {
      getVoices: () => [{ lang: 'en-US' }],
      speak,
      cancel: vi.fn(),
    });
    const { result, unmount } = renderHook(useNarration);
    act(() => result.current.speak('Enunciado'));
    expect(result.current.message).toContain('Nenhuma voz em português');
    expect(result.current.speaking).toBe(false);
    expect(speak).not.toHaveBeenCalled();
    unmount();
  });

  it('uses a Portuguese voice, ends playback and cancels when leaving the screen', () => {
    let utterance: TestUtterance | undefined;
    const cancel = vi.fn();
    const voice = { lang: 'pt-BR' };
    vi.stubGlobal('SpeechSynthesisUtterance', TestUtterance);
    vi.stubGlobal('speechSynthesis', {
      getVoices: () => [voice],
      cancel,
      speak: (value: TestUtterance) => {
        utterance = value;
      },
    });
    const { result, unmount } = renderHook(useNarration);
    act(() => result.current.speak('Dois robôs'));
    expect(result.current.speaking).toBe(true);
    expect(utterance?.text).toBe('Dois robôs');
    expect(utterance?.voice).toEqual(voice);
    expect(utterance?.rate).toBe(0.85);
    act(() => utterance?.onend?.());
    expect(result.current.speaking).toBe(false);
    act(() => result.current.speak('Nova missão'));
    act(() => result.current.stop());
    expect(result.current.speaking).toBe(false);
    unmount();
    expect(cancel).toHaveBeenCalled();
  });

  it('keeps a readable fallback on playback errors', () => {
    let utterance: TestUtterance | undefined;
    vi.stubGlobal('SpeechSynthesisUtterance', TestUtterance);
    vi.stubGlobal('speechSynthesis', {
      getVoices: () => [{ lang: 'pt-BR' }],
      cancel: vi.fn(),
      speak: (value: TestUtterance) => {
        utterance = value;
      },
    });
    const { result, unmount } = renderHook(useNarration);
    act(() => result.current.speak('Enunciado'));
    act(() => utterance?.onerror?.());
    expect(result.current.message).toContain('Não foi possível ler');
    expect(result.current.speaking).toBe(false);
    unmount();
  });
});
