import { Icon } from '../../../../../components/Icon/Icon';
import { IconName } from '../../../../../components/icon-names';
import { type MissionGuideProps } from './mission-guide-types';
import { HintButton } from './HintButton/HintButton';
import { HintList } from './HintList/HintList';

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
