import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { TutorialPractice } from './TutorialPractice';
import { AlgebraTutorial } from './AlgebraTutorial';
import type { TutorialProps, TutorialPageProps } from './tutorial-view';
import { useTutorial } from './hooks/useTutorial';
function TutorialBack({ onBack }: { onBack: TutorialProps['onBack'] }) {
  return (
    <button className="text-button back-link" onClick={onBack}>
      <Icon name={IconName.Back} size={18} />
      Voltar ao mapa
    </button>
  );
}
function TutorialHeading({ step }: { step: number }) {
  return (
    <>
      <p className="eyebrow">ANTES DE DECOLAR · PASSO {step + 2} DE 4</p>
      <h1>{step === -1 ? 'Seu primeiro voo.' : 'Seu primeiro contato com a álgebra.'}</h1>
    </>
  );
}
function TutorialPage(props: TutorialPageProps) {
  const Page = props.step < 0 ? TutorialPractice : AlgebraTutorial;
  return <Page {...props} />;
}
export function Tutorial(props: TutorialProps) {
  const tutorial = useTutorial();
  return (
    <section className="tutorial-screen">
      <TutorialBack onBack={props.onBack} />
      <TutorialHeading step={tutorial.step} />
      <TutorialPage {...props} {...tutorial} />
    </section>
  );
}
