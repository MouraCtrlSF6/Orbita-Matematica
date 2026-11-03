import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
interface MissionGuideProps {
  hints: string[];
  openHints: number;
  done: boolean;
  onHint: () => void;
}
const introduction = (
  <>
    <div className="guide-avatar" aria-hidden="true">
      ✦
    </div>
    <p className="eyebrow">LUMA · SUA GUIA DE BORDO</p>
    <h2>Vamos descobrir juntos?</h2>
    <p>Você pode tentar quantas vezes quiser. Uma pista pode ajudar a enxergar um novo caminho.</p>
  </>
);
const asideNote = (
  <div className="aside-note">
    <Icon name={IconName.Star} size={18} />
    <span>Pedir ajuda também faz parte de aprender.</span>
  </div>
);
function hintLabel(openHints: number, limit: number): string {
  if (!openHints) return 'Quero uma pista';
  return openHints < limit ? 'Próximo passo' : 'Todas as dicas abertas';
}
function HintButton({ hints, openHints, done, onHint }: MissionGuideProps) {
  return (
    <button
      className="button hint-button"
      disabled={openHints >= hints.length || done}
      onClick={onHint}
    >
      <Icon name={IconName.Bulb} size={19} />
      {hintLabel(openHints, hints.length)}
    </button>
  );
}
function Hint({ text, index }: { text: string; index: number }) {
  return (
    <li>
      <span>{index + 1}</span>
      <p>{text}</p>
    </li>
  );
}
function HintList({ hints, openHints }: MissionGuideProps) {
  return (
    <ol className="hints-list" aria-live="polite">
      {hints.slice(0, openHints).map((hint, index) => (
        <Hint key={hint} text={hint} index={index} />
      ))}
    </ol>
  );
}
export function MissionGuide(props: MissionGuideProps) {
  return (
    <aside className="mission-aside">
      {introduction}
      <HintButton {...props} />
      <HintList {...props} />
      {asideNote}
    </aside>
  );
}
