import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { ObjectModel } from './ObjectModel';
import type { MissionViewProps } from './mission-view';
function NarrationButton({ session }: MissionViewProps) {
  return (
    <button
      className="subtle-button [background:#f6f5f8] [border:1px_solid_#e6e1ed] text-[#665873] rounded-subtle py-[0.5625rem] px-3 inline-flex items-center justify-center gap-[0.4375rem] text-label min-h-10 ds-hover:[background:#ece6f5] ds-down-mobile:text-caption"
      onClick={session.toggleNarration}
    >
      <Icon name={IconName.Sound} size={18} />
      {session.narration.speaking ? 'Parar leitura' : 'Ouvir enunciado'}
    </button>
  );
}
function VisualButton({ session }: MissionViewProps) {
  return (
    <button
      className="subtle-button [background:#f6f5f8] [border:1px_solid_#e6e1ed] text-[#665873] rounded-subtle py-[0.5625rem] px-3 inline-flex items-center justify-center gap-[0.4375rem] text-label min-h-10 ds-hover:[background:#ece6f5] ds-down-mobile:text-caption"
      aria-expanded={session.visual}
      onClick={session.toggleVisual}
    >
      <span aria-hidden="true">◇</span>
      {session.visual ? 'Ocultar objetos' : 'Ver com objetos'}
    </button>
  );
}
function SupportButtons(props: MissionViewProps) {
  return (
    <div className="support-actions flex gap-3 flex-wrap mt-4.5 mr-0 mb-0 ml-0 ds-down-mobile:gap-2">
      <NarrationButton {...props} />
      <VisualButton {...props} />
    </div>
  );
}
function MissionVisual({ mission, session }: MissionViewProps) {
  if (!session.visual) return null;
  const model = session.creation
    ? { groups: session.variable, perGroup: 2, extra: 4, label: session.context }
    : mission.visual;
  return <ObjectModel model={model} />;
}
export function MissionSupport(props: MissionViewProps) {
  return (
    <>
      <SupportButtons {...props} />
      <p className="narration-status [&:empty]:hidden text-small mt-3 text-[#785d33]" role="status">
        {props.session.narration.message}
      </p>
      <MissionVisual {...props} />
    </>
  );
}
