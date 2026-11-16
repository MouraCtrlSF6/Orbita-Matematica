import { Icon } from '../../../../components/Icon/Icon';
import { IconName } from '../../../../components/icon-names';

export function SignBrand() {
  return (
    <div
      className="relative flex max-w-full flex-wrap items-center justify-center gap-4 text-sector-purple"
      aria-label="Órbita Matemática"
    >
      <Icon name={IconName.Orbit} size={64} />
      <span className="text-left">
        <span className="block font-heading text-[3rem] font-extrabold leading-none tracking-[-0.045em] text-space-ink ds-down-mobile:text-[2.5rem]">
          órbita
        </span>
        <span className="mt-3 block text-caption font-semibold tracking-[0.3em] text-space-ink">
          MATEMÁTICA
        </span>
      </span>
    </div>
  );
}
