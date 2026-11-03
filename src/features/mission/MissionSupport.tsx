import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { ObjectModel } from './ObjectModel';
import type { MissionViewProps } from './mission-view';
function NarrationButton({ session }: MissionViewProps) {
  return (
    <button className="subtle-button" onClick={session.toggleNarration}>
      <Icon name={IconName.Sound} size={18} />
      {session.narration.speaking ? 'Parar leitura' : 'Ouvir enunciado'}
    </button>
  );
}
function VisualButton({ session }: MissionViewProps) {
  return (
    <button className="subtle-button" aria-expanded={session.visual} onClick={session.toggleVisual}>
      <span aria-hidden="true">◇</span>
      {session.visual ? 'Ocultar objetos' : 'Ver com objetos'}
    </button>
  );
}
function SupportButtons(props: MissionViewProps) {
  return (
    <div className="support-actions">
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
      <p className="narration-status" role="status">
        {props.session.narration.message}
      </p>
      <MissionVisual {...props} />
    </>
  );
}
