import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
interface NarrationState {
  message: string;
  speaking: boolean;
}
function cancelNarration() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function hasNarration(): boolean {
  return Boolean(window.speechSynthesis) && typeof window.SpeechSynthesisUtterance !== 'undefined';
}

function prepareUtterance(text: string): SpeechSynthesisUtterance | string {
  if (!hasNarration())
    return 'Leitura em voz alta indisponível neste navegador. O enunciado e as dicas continuam na tela.';
  const voice = window.speechSynthesis
    .getVoices()
    .find((item) => item.lang.toLowerCase().startsWith('pt'));

  if (!voice)
    return 'Nenhuma voz em português está disponível agora. Tente novamente após carregar uma voz no navegador ou acompanhe o texto.';
  const utterance = new SpeechSynthesisUtterance(text);

  utterance.voice = voice;
  utterance.lang = 'pt-BR';
  utterance.rate = 0.85;
  return utterance;
}

function bindUtterance(
  utterance: SpeechSynthesisUtterance,
  update: (state: Partial<NarrationState>) => void,
) {
  utterance.onend = () => update({ speaking: false });
  utterance.onerror = () =>
    update({
      speaking: false,
      message: 'Não foi possível ler o texto. Você pode continuar pelas instruções na tela.',
    });
}

class NarrationActions {
  constructor(private setState: Dispatch<SetStateAction<NarrationState>>) {}
  private update = (patch: Partial<NarrationState>) =>
    this.setState((state) => ({ ...state, ...patch }));
  stop = () => {
    cancelNarration();
    this.update({ speaking: false });
  };
  speak = (text: string) => {
    const utterance = prepareUtterance(text);

    if (typeof utterance === 'string') {
      this.update({ message: utterance });
      return;
    }
    this.stop();
    bindUtterance(utterance, this.update);
    window.speechSynthesis.speak(utterance);
    this.update({ speaking: true, message: '' });
  };
}
export function useNarration() {
  const [state, setState] = useState<NarrationState>({ message: '', speaking: false });

  useEffect(() => cancelNarration, []);
  const actions = new NarrationActions(setState);

  return {
    ...state,
    stop: actions.stop,
    speak: actions.speak,
  };
}
