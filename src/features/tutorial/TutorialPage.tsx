import { TutorialPractice } from './TutorialPractice';
import { AlgebraTutorial } from './AlgebraTutorial';
import type { TutorialPageProps } from './tutorial-view';

export function TutorialPage(props: TutorialPageProps) {
  const Page = props.step < 0 ? TutorialPractice : AlgebraTutorial;

  return <Page {...props} />;
}
