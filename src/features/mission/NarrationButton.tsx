import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { useMissionContext } from './hooks/useMissionContext';

export function NarrationButton() {
  const { session } = useMissionContext();

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
