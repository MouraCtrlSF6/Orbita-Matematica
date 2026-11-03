import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';

interface MissionGuideProps {
  hints: string[];
  openHints: number;
  done: boolean;
  onHint: () => void;
}

export function MissionGuide({ hints, openHints, done, onHint }: MissionGuideProps) {
  const allHintsOpen = openHints >= hints.length;
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
      <button className="button hint-button" disabled={allHintsOpen || done} onClick={onHint}>
        <Icon name={IconName.Bulb} size={19} />
        {openHints === 0
          ? 'Quero uma pista'
          : !allHintsOpen
            ? 'Próximo passo'
            : 'Todas as dicas abertas'}
      </button>
      <ol className="hints-list" aria-live="polite">
        {hints.slice(0, openHints).map((hint, index) => (
          <li key={hint}>
            <span>{index + 1}</span>
            <p>{hint}</p>
          </li>
        ))}
      </ol>
      <div className="aside-note">
        <Icon name={IconName.Star} size={18} />
        <span>Pedir ajuda também faz parte de aprender.</span>
      </div>
    </aside>
  );
}
