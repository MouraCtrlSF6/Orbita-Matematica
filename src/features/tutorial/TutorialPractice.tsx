import { SpaceFlight } from '../map/SpaceFlight';
import { createWorld } from '../../game/space';
import type { TutorialPageProps } from './tutorial-view';

const practiceWorld = createWorld([{ id: 'beacon', label: 'Sinal de treinamento' }]);

const practiceStatus = {
  beacon: {
    unlocked: true,
    completed: false,
    detail: 'Aproxime-se e confirme a entrada para concluir a prática',
  },
};

const practiceDescription = (
  <>
    <p>
      No universo, visite os setores. Dentro de cada setor, encontre planetas, luas e asteroides com
      desafios. Conclua uma missão para liberar a próxima.
    </p>
    <p>
      Experimente voar até o sinal e confirme a entrada. Você também pode usar os botões de direção
      ou pular esta prática; nos mapas, “Destinos em lista” permite visitar sem pilotar.
    </p>
  </>
);

interface TutorialPracticeProps {
  onPilotDone: TutorialPageProps['onPilotDone'];
  reducedMotion?: TutorialPageProps['reducedMotion'];
  soundEnabled?: TutorialPageProps['soundEnabled'];
  paused?: TutorialPageProps['paused'];
}

export function TutorialPractice(props: TutorialPracticeProps) {
  return (
    <div className="tutorial-pilot mt-4.5 [&_>_p]:mb-[0.9375rem]">
      {practiceDescription}
      <SpaceFlight
        world={practiceWorld}
        statuses={practiceStatus}
        nextId="beacon"
        initialPosition={{ x: 260, y: 470 }}
        reducedMotion={props.reducedMotion ?? false}
        soundEnabled={props.soundEnabled ?? true}
        paused={props.paused}
        onVisit={props.onPilotDone}
      />
      <div className="button-row [.tutorial-pilot_&]:flex [.tutorial-pilot_&]:flex-wrap [.tutorial-pilot_&]:gap-3 [.tutorial-pilot_&]:mt-[0.9375rem] flex gap-2.5 flex-wrap mt-[0.9375rem]">
        <button
          className="button primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-primary:bg-primary ds-primary:text-white ds-primary:ds-hover:bg-primary-hover ds-primary:ds-hover:[transform:translateY(-0.0625rem)] ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
          onClick={props.onPilotDone}
        >
          Pular prática de pilotagem
        </button>
      </div>
    </div>
  );
}
