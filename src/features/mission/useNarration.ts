import { useEffect, useState } from 'react';

export function useNarration() {
  const [message, setMessage] = useState('');
  const [speaking, setSpeaking] = useState(false);
  useEffect(
    () => () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    },
    [],
  );

  function stop() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  function speak(text: string) {
    if (!window.speechSynthesis || typeof window.SpeechSynthesisUtterance === 'undefined') {
      setMessage(
        'Leitura em voz alta indisponível neste navegador. O enunciado e as dicas continuam na tela.',
      );
      return;
    }

    const voices = window.speechSynthesis
      .getVoices()
      .filter((item) => item.lang.toLowerCase().startsWith('pt'));

    if (!voices.length) {
      setMessage(
        'Nenhuma voz em português está disponível agora. Tente novamente após carregar uma voz no navegador ou acompanhe o texto.',
      );
      return;
    }

    const DEFAULT_VOICE = 0;

    const voice = voices[DEFAULT_VOICE];

    stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = 'pt-BR';
    utterance.rate = 0.85;

    utterance.onend = () => setSpeaking(false);

    utterance.onerror = () => {
      setSpeaking(false);
      setMessage('Não foi possível ler o texto. Você pode continuar pelas instruções na tela.');
    };

    window.speechSynthesis.speak(utterance);

    setSpeaking(true);
    setMessage('');
  }
  return { speak, stop, speaking, message };
}
