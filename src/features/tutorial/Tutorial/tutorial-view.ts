import type { RefObject } from 'react';
export interface TutorialProps {
  onFinish: () => void;
  onBack: () => void;
  reducedMotion?: boolean;
  soundEnabled?: boolean;
  paused?: boolean;
}
export interface TutorialPageProps extends TutorialProps {
  step: number;
  answer: string;
  cardRef: RefObject<HTMLDivElement | null>;
  onNext: () => void;
  onPilotDone: () => void;
  onAnswer: (value: string) => void;
}
