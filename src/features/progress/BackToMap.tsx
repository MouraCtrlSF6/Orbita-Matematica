import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';

export interface BackToMapProps {
  onBack: () => void;
}

export function BackToMap({ onBack }: BackToMapProps) {
  return (
    <button
      className="text-button back-link inline-flex items-center justify-center gap-[0.5625rem] text-label font-semibold [background:none] text-[#6b697d] [border:0] py-2 px-0 ds-hover:underline mb-5.5 [.support-banner_&]:ml-auto [.support-banner_&]:whitespace-nowrap [.support-banner_&]:text-caption ds-down-desktop:[.support-banner_&]:ml-13.5 ds-down-tablet:[.support-banner_&]:ml-auto ds-down-mobile:[.support-banner_&]:ml-13.5 ds-down-mobile:[.support-banner_&]:-mt-2.5"
      onClick={onBack}
    >
      <Icon name={IconName.Back} size={18} />
      Voltar ao mapa
    </button>
  );
}
