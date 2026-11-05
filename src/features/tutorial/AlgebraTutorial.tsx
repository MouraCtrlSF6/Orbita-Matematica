import type { TutorialPageProps } from './tutorial-view';
import { LumaIntroduction } from './LumaIntroduction';
import { VariableLesson } from './VariableLesson';
import { AlgebraPractice } from './AlgebraPractice';
import { TutorialCard } from './TutorialCard';

const pages = [LumaIntroduction, VariableLesson, AlgebraPractice];

interface AlgebraTutorialProps {
  step: TutorialPageProps['step'];
  cardRef: TutorialPageProps['cardRef'];
  onNext: TutorialPageProps['onNext'];
  answer: TutorialPageProps['answer'];
  onAnswer: TutorialPageProps['onAnswer'];
  onFinish: TutorialPageProps['onFinish'];
}

export function AlgebraTutorial(props: AlgebraTutorialProps) {
  const Page = pages[props.step];

  return (
    <TutorialCard cardRef={props.cardRef} step={props.step}>
      <Page {...props} />
    </TutorialCard>
  );
}
