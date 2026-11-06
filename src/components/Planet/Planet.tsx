const planetDetails = (
  <>
    <div className="planet-ring absolute [border:1px_solid_#e5e9e8] left-2 top-[1.0625rem] w-37 h-[5.9375rem] [transform:rotate(-26deg)] rounded-full [.planet-art.purple_&]:h-7 [.planet-art.purple_&]:top-12 [.planet-art.purple_&]:[border:0.375rem_solid_#cbb6e3] [.planet-art.purple_&]:[z-index:1] [.planet-art.purple_&]:[opacity:0.65] [.planet-art.purple_&]:[transform:rotate(-25deg)] ds-up-wide:top-[1.6875rem] ds-up-wide:[.planet-art.purple_&]:top-14.5" />
    <div className="planet-sphere h-[5.1875rem] w-[5.1875rem] absolute left-[2.6875rem] top-5.5 rounded-full overflow-hidden [background:linear-gradient(_140deg,_var(--planet-light),_var(--planet-main)_40%,_var(--planet-dark)_)] [box-shadow:inset_-0.4375rem_-0.3125rem_1.125rem_#00000012,_0_0.625rem_1.25rem_#a5a1b019] [&_i]:absolute [&_i]:top-5.5 [&_i]:-left-2.5 [&_i]:w-[4.8125rem] [&_i]:h-[1.0625rem] [&_i]:[background:var(--planet-light)] [&_i]:[opacity:0.5] [&_i]:[transform:rotate(-20deg)] [&_i]:rounded-[40%] [&_b]:absolute [&_b]:bottom-2.5 [&_b]:right-[-0.9375rem] [&_b]:w-17.5 [&_b]:h-5.5 [&_b]:[background:var(--planet-dark)] [&_b]:[opacity:0.3] [&_b]:[transform:rotate(-20deg)] [&_b]:rounded-[40%] [&_span]:absolute [&_span]:top-[0.8125rem] [&_span]:right-4.5 [&_span]:w-[1.0625rem] [&_span]:h-[0.5625rem] [&_span]:bg-white [&_span]:[opacity:0.25] [&_span]:rounded-full [&_span]:[transform:rotate(-30deg)] [.planet-art.peach_&]:w-18.5 [.planet-art.peach_&]:h-18.5 [.planet-art.peach_&]:left-12 [.planet-art.peach_&]:top-[1.6875rem] ds-up-wide:top-8 ds-up-wide:[.planet-art.peach_&]:top-[2.3125rem]">
      <i />
      <b />
      <span />
    </div>
    <div className="satellite absolute left-[1.0625rem] top-[2.8125rem] w-[0.6875rem] h-[0.6875rem] [background:var(--planet-light)] rounded-full [box-shadow:inset_-0.1875rem_-0.125rem_0.125rem_var(--planet-main)]" />
    <div className="planet-spark text-[var(--planet-dark)] absolute text-support right-5.5 top-[1.3125rem]">
      ✦
    </div>
  </>
);

export interface PlanetProps {
  variant: string;
}

export function Planet({ variant }: PlanetProps) {
  return (
    <div
      className={`planet-art h-[7.9375rem] relative w-42.5 max-w-full mt-[0.0625rem] mr-auto mb-1 ml-auto [--planet-main:var(--color-planet-mint)] [--planet-dark:var(--color-planet-mint-dark)] [--planet-light:var(--color-planet-mint-light)] ds-purple:[--planet-main:var(--color-planet-purple)] ds-purple:[--planet-dark:var(--color-planet-purple-dark)] ds-purple:[--planet-light:var(--color-planet-purple-light)] ds-peach-sector:[--planet-main:var(--color-planet-peach)] ds-peach-sector:[--planet-dark:var(--color-planet-peach-dark)] ds-peach-sector:[--planet-light:var(--color-planet-peach-light)] ds-up-wide:h-37.5 ds-up-wide:mt-2 ds-down-tablet:[grid-row:2/7] ds-down-tablet:[grid-column:1] ds-down-tablet:self-center ds-down-mobile:w-30 ds-down-mobile:[transform:scale(0.8)] ds-down-mobile:[transform-origin:left_center] ${variant}`}
      aria-hidden="true"
    >
      {planetDetails}
    </div>
  );
}
