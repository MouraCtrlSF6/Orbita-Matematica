import { useRef, useState } from 'react';
import { evaluate, isCorrect } from '../../game/math';
import { ChallengeKind, type Mission, type MissionResult } from '../../game/types';
import { useNarration } from './useNarration';
import { sectors } from '../../content/sectors';

export function useMission(mission: Mission, onComplete: (result: MissionResult) => void) {
  const hintLimit = sectors.find((sector) => sector.id === mission.sectorId)!.hintLimit;
  const [answer, setAnswer] = useState('');
  const [hints, setHints] = useState(0);
  const [visual, setVisual] = useState(false);
  const [visualUsed, setVisualUsed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [done, setDone] = useState(false);
  const [context, setContext] = useState('cristais');
  const [variable, setVariable] = useState(mission.variable);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const narration = useNarration();
  const creation = mission.kind === ChallengeKind.Create;
  const expected = evaluate(mission.expression, variable);

  function complete() {
    if (done) return;
    narration.stop();
    setDone(true);
    setFeedback('Boa descoberta! Você concluiu a missão.');
    onComplete({
      hints,
      visual: visualUsed,
      attempts: attempts + 1,
      guided: false,
      ...(creation ? { creation: { context, variable } } : {}),
    });
    requestAnimationFrame(() => feedbackRef.current?.focus());
  }

  function checkAnswer() {
    if (!answer.trim() || done) return;
    if (isCorrect(mission, answer, variable)) complete();
    else {
      setAttempts((value) => value + 1);
      setFeedback(
        mission.kind === ChallengeKind.Build
          ? `Vamos ajustar a expressão. ${mission.hints[0]} Você pode usar Desfazer ou pedir uma pista.`
          : `Ainda não chegamos ao resultado. ${mission.hints[0]} Tente novamente ou peça uma pista.`,
      );
    }
  }

  function changeAnswer(value: string) {
    setAnswer(value);
    setFeedback('');
  }
  function changeContext(value: string) {
    setContext(value);
    changeAnswer('');
  }
  function changeVariable(value: number) {
    setVariable(value);
    changeAnswer('');
  }
  function toggleVisual() {
    setVisual((value) => !value);
    setVisualUsed(true);
  }
  function requestHint() {
    if (!done) setHints((value) => Math.min(hintLimit, value + 1));
  }
  function toggleNarration() {
    if (narration.speaking) {
      narration.stop();
      return;
    }
    const detail = creation
      ? `Cada um dos ${variable} robôs leva 2 ${context}. A base guarda mais 4. Quantos temos ao todo?`
      : mission.kind === ChallengeKind.Build
        ? ''
        : mission.formula;
    narration.speak(
      `${mission.prompt} ${detail}`
        .replaceAll('×', ' vezes ')
        .replaceAll('+', ' mais ')
        .replaceAll('=', ' igual a '),
    );
  }

  return {
    answer,
    hints,
    hintLimit,
    visual,
    feedback,
    done,
    context,
    variable,
    creation,
    expected,
    feedbackRef,
    narration,
    checkAnswer,
    changeAnswer,
    changeContext,
    changeVariable,
    toggleVisual,
    requestHint,
    toggleNarration,
  };
}
