import type { TutorialProps } from './tutorial-view';
import { useTutorial } from './hooks/useTutorial';
import { TutorialBack } from './TutorialBack';
import { TutorialHeading } from './TutorialHeading';
import { TutorialPage } from './TutorialPage';

export function Tutorial(props: TutorialProps) {
  const tutorial = useTutorial();

  return (
    <section className="tutorial-screen [&_>_h1]:mt-2.5 [&_>_h1]:mr-0 [&_>_h1]:mb-[0.9375rem] [&_>_h1]:ml-0">
      <TutorialBack onBack={props.onBack} />
      <TutorialHeading step={tutorial.step} />
      <TutorialPage {...props} {...tutorial} />
    </section>
  );
}
