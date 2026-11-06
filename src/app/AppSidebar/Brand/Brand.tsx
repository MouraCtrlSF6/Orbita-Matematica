import { Icon } from '../../../components/Icon/Icon';
import { IconName } from '../../../components/icon-names';

export interface BrandProps {
  onMap: () => void;
}

export function Brand({ onMap }: BrandProps) {
  return (
    <a
      href="#main"
      className="brand no-underline flex items-center gap-3 mt-0 mr-[0.9375rem] mb-15.5 ml-[0.9375rem] text-[#f8f5ff] font-heading text-brand font-extrabold leading-[1.2] tracking-[-0.09375rem] ds-down-desktop:ml-3 ds-down-desktop:text-brand-compact ds-down-tablet:text-dialog-heading ds-down-tablet:ml-1 ds-down-tablet:gap-1.5 ds-down-mobile:text-brand-mobile ds-down-mobile:mt-0 ds-down-mobile:mr-0 ds-down-mobile:mb-4 ds-down-mobile:ml-0 ds-down-mobile:justify-center"
      onClick={onMap}
      aria-label="Órbita Matemática, início"
    >
      <span className="brand-symbol text-[#c0adf3] [transform:rotate(-10deg)] ds-down-tablet:[&_svg]:w-7">
        <Icon name={IconName.Orbit} size={32} />
      </span>
      <span>
        órbita
        <span className="brand-subtitle block [font:600_0.5625rem_'DM_Sans',_sans-serif] tracking-[0.1875rem] mt-[0.3125rem] text-[#a9a6c0] ds-down-tablet:text-micro ds-down-mobile:text-detail ds-down-mobile:tracking-[0.125rem]">
          MATEMÁTICA
        </span>
      </span>
    </a>
  );
}
