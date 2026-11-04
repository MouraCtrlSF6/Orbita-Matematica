import { useEffect, useRef, useState } from 'react';
export function useTutorial() {
  const [step, setStep] = useState(-1);
  const [answer, setAnswer] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (step >= 0) cardRef.current?.focus();
  }, [step]);
  return {
    step,
    answer,
    cardRef,
    onAnswer: setAnswer,
    onNext: () => setStep(step + 1),
    onPilotDone: () => setStep(0),
  };
}
