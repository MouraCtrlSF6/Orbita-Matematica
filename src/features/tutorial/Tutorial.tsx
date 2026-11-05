import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { TutorialPractice } from './TutorialPractice';
import { AlgebraTutorial } from './AlgebraTutorial';
import type { TutorialProps, TutorialPageProps } from './tutorial-view';
import { useTutorial } from './hooks/useTutorial';
function TutorialBack({ onBack }: { onBack: TutorialProps['onBack'] }) {
  return (
    <button
      className="text-button back-link inline-flex items-center justify-center gap-[0.5625rem] text-label font-semibold [background:none] text-[#6b697d] [border:0] py-2 px-0 ds-hover:underline mb-5.5 [.support-banner_&]:ml-auto [.support-banner_&]:whitespace-nowrap [.support-banner_&]:text-caption ds-down-desktop:[.support-banner_&]:ml-13.5 ds-down-tablet:[.support-banner_&]:ml-auto ds-down-mobile:[.support-banner_&]:ml-13.5 ds-down-mobile:[.support-banner_&]:-mt-2.5"
      onClick={onBack}
    >
      <Icon name={IconName.Back} size={18} />
      Voltar ao mapa
    </button>
  );
}
function TutorialHeading({ step }: { step: number }) {
  return (
    <>
      <p className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
        ANTES DE DECOLAR · PASSO {step + 2} DE 4
      </p>
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
    <section className="tutorial-screen [&_>_h1]:mt-2.5 [&_>_h1]:mr-0 [&_>_h1]:mb-[0.9375rem] [&_>_h1]:ml-0">
      <TutorialBack onBack={props.onBack} />
      <TutorialHeading step={tutorial.step} />
      <TutorialPage {...props} {...tutorial} />
    </section>
  );
}
