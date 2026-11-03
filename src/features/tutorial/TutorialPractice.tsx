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
export function TutorialPractice(props: TutorialPageProps) {
  return (
    <div className="tutorial-pilot">
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
      <div className="button-row">
        <button className="button primary" onClick={props.onPilotDone}>
          Pular prática de pilotagem
        </button>
      </div>
    </div>
  );
}
