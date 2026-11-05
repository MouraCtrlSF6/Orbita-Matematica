import { TutorialPractice } from './TutorialPractice/TutorialPractice';
import { AlgebraTutorial } from './AlgebraTutorial/AlgebraTutorial';
import type { TutorialPageProps } from '../tutorial-view';

export function TutorialPage(props: TutorialPageProps) {
  const Page = props.step < 0 ? TutorialPractice : AlgebraTutorial;

  return <Page {...props} />;
}
