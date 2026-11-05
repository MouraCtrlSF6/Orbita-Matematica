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
    <div
      className="guide-avatar grid place-items-center [border:1px_solid_#ccbce4] [background:#e0d3f2] w-12 h-12 rounded-dialog text-[#8665ad] text-guide mb-4.5 ds-down-tablet:[.mission-aside_&]:[float:right]"
      aria-hidden="true"
    >
      ✦
    </div>
    <p className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
      LUMA · SUA GUIA DE BORDO
    </p>
    <h2>Vamos descobrir juntos?</h2>
    <p>Você pode tentar quantas vezes quiser. Uma pista pode ajudar a enxergar um novo caminho.</p>
  </>
);
const asideNote = (
  <div className="aside-note [border-top:1px_solid_#dfd6e9] flex gap-[0.5625rem] text-caption text-[#6a5977] mt-[1.4375rem] pt-4.5 [&_svg]:shrink-0">
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
      className="button hint-button min-h-11 [border:1px_solid_#d8cce6] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] bg-white text-[#71558d] w-full mt-5 mr-0 mb-0 ml-0 ds-hover:[background:#f8f5fd] [.feedback_&]:mt-[1.0625rem] ds-down-tablet:max-w-80 [.tutorial-card_&]:mt-6"
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
    <ol
      className="hints-list [list-style:none] p-0 m-0 [&_li]:flex [&_li]:items-start [&_li]:gap-[0.5625rem] [&_li]:mt-4.5 [&_li_>_span]:grid [&_li_>_span]:place-items-center [&_li_>_span]:w-5 [&_li_>_span]:h-5 [&_li_>_span]:shrink-0 [&_li_>_span]:[background:#e1d6ee] [&_li_>_span]:text-[#73588f] [&_li_>_span]:rounded-full [&_li_>_span]:text-caption [&_li_>_span]:font-bold [&_p]:text-small [&_p]:text-[#5b5069] ds-down-tablet:grid ds-down-tablet:gap-3"
      aria-live="polite"
    >
      {hints.slice(0, openHints).map((hint, index) => (
        <Hint key={hint} text={hint} index={index} />
      ))}
    </ol>
  );
}
export function MissionGuide(props: MissionGuideProps) {
  return (
    <aside className="mission-aside [background:#f0ecf7] [border:1px_solid_#e4dded] rounded-aside p-[1.4375rem] [&_h2]:text-panel-heading [&_h2]:mt-2 [&_h2]:mr-0 [&_h2]:mb-3 [&_h2]:ml-0 [&_>_p:not(.eyebrow)]:text-small [&_>_p:not(.eyebrow)]:text-[#64576f] [&_>_p:not(.eyebrow)]:leading-[1.8] ds-down-desktop:p-5 ds-down-tablet:max-w-none ds-down-tablet:[&_>_p:not(.eyebrow)]:max-w-125">
      {introduction}
      <HintButton {...props} />
      <HintList {...props} />
      {asideNote}
    </aside>
  );
}
