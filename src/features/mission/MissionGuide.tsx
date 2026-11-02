import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';

interface MissionGuideProps {
  hints: [string, string, string];
  openHints: number;
  done: boolean;
  solution: string;
  onHint: () => void;
  onGuidedComplete: () => void;
}

export function MissionGuide({
  hints,
  openHints,
  done,
  solution,
  onHint,
  onGuidedComplete,
}: MissionGuideProps) {
  return (
    <aside className="mission-aside">
      <div className="guide-avatar" aria-hidden="true">
        ✦
      </div>
      <p className="eyebrow">LUMA · SUA GUIA DE BORDO</p>
      <h2>Vamos descobrir juntos?</h2>
      <p>
        Você pode tentar quantas vezes quiser. Uma pista pode ajudar a enxergar um novo caminho.
      </p>
      <button className="button hint-button" disabled={openHints === 3 || done} onClick={onHint}>
        <Icon name={IconName.Bulb} size={19} />
        {openHints === 0
          ? 'Quero uma pista'
          : openHints < 3
            ? 'Próximo passo'
            : 'Todos os passos abertos'}
      </button>
      <ol className="hints-list" aria-live="polite">
        {hints.slice(0, openHints).map((hint, index) => (
          <li key={hint}>
            <span>{index + 1}</span>
            <p>{hint}</p>
          </li>
        ))}
      </ol>
      {openHints === 3 && !done ? (
        <div className="guided-solution">
          <p>{solution}</p>
          <button className="text-button" onClick={onGuidedComplete}>
            Entendi, concluir com apoio
            <Icon name={IconName.Check} size={18} />
          </button>
        </div>
      ) : null}
      <div className="aside-note">
        <Icon name={IconName.Star} size={18} />
        <span>Pedir ajuda também faz parte de aprender.</span>
      </div>
    </aside>
  );
}
