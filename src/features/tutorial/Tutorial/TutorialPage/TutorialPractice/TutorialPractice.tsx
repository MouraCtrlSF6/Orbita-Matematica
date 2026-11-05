import { Button } from '../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../components/Button/button-styles';
import { SpaceFlight } from '../../../../map/SpaceFlight/SpaceFlight';
import { createWorld } from '../../../../../game/space';
import type { TutorialPageProps } from '../../tutorial-view';

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
        <Button
          variant={ButtonVariant.Primary}

          onClick={props.onPilotDone}
          className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        >
          Pular prática de pilotagem
        </Button>
      </div>
    </div>
  );
}
