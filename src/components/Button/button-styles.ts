import { cva } from 'class-variance-authority';
import { ControlSize } from '../utils/control-styles';

export enum ButtonVariant {
  Primary = 'primary',
  DangerSolid = 'danger-solid',
  Text = 'text',
  Subtle = 'subtle',
  Navigation = 'navigation',
  Icon = 'icon',
  Secondary = 'secondary',
  Peach = 'peach',
  Danger = 'danger',
  Ghost = 'ghost',
  FlightPrimary = 'flight-primary',
  FlightSecondary = 'flight-secondary',
}

export const buttonStyles = cva(
  'button min-h-11 px-5 py-3 text-small inline-flex shrink-0 items-center justify-center gap-[0.6875rem] rounded-control border-0 font-bold no-underline disabled:cursor-not-allowed disabled:opacity-[0.48] disabled:transform-none! ds-reduced-motion:transition-none',
  {
    variants: {
      variant: {
        [ButtonVariant.Icon]:
          'icon-button [background:#f2eff7] text-[#746283] [border:0] w-10 h-10 rounded-full grid place-items-center min-h-10 p-0',
        [ButtonVariant.Navigation]:
          'nav-item justify-start [border:0] text-[#b5b6c8] [background:none] flex items-center text-left gap-[0.8125rem] min-h-[3.0625rem] py-3 px-3.5 rounded-option w-full min-w-0 [overflow-wrap:anywhere] text-small font-medium whitespace-normal [&_svg]:text-[#9193ae] [&_svg]:w-[1.1875rem] ds-hover:[background:#22243b] ds-hover:text-white ds-active:[background:#29263f] ds-active:text-[#dbcef9] ds-active:[box-shadow:inset_0.1875rem_0_#baa0f1] [&.active_svg]:text-[#c5adf8] ds-down-desktop:text-label ds-down-desktop:gap-[0.5625rem] ds-down-tablet:whitespace-normal ds-down-tablet:py-3 ds-down-tablet:px-[0.5625rem] ds-down-mobile:justify-center ds-down-mobile:text-center ds-down-mobile:text-caption ds-down-mobile:gap-1.5 ds-down-mobile:py-[0.5625rem] ds-down-mobile:px-1.5 ds-down-mobile:min-h-[2.6875rem] ds-down-mobile:[flex:1] ds-down-mobile:[&_svg]:w-4 ds-down-mobile:[.sidebar-bottom_&]:absolute ds-down-mobile:[.sidebar-bottom_&]:top-[1.0625rem] ds-down-mobile:[.sidebar-bottom_&]:right-[0.9375rem] ds-down-mobile:[.sidebar-bottom_&]:w-10 ds-down-mobile:[.sidebar-bottom_&]:overflow-hidden ds-down-mobile:[.sidebar-bottom_&]:block ds-down-mobile:[.sidebar-bottom_&]:text-transparent ds-down-mobile:[.sidebar-bottom_&]:text-[length:0] ds-down-mobile:[.sidebar-bottom_&]:min-h-10 ds-down-mobile:[.sidebar-bottom_&_svg]:text-[#b9a5db] ds-down-mobile:[.sidebar-bottom_&_svg]:w-5',
        [ButtonVariant.Subtle]:
          'subtle-button font-normal [background:#f6f5f8] [border:1px_solid_#e6e1ed] text-[#665873] rounded-subtle py-[0.5625rem] px-3 inline-flex items-center justify-center gap-[0.4375rem] text-label min-h-10 ds-hover:[background:#ece6f5] ds-down-mobile:text-caption',
        [ButtonVariant.Text]:
          'text-button inline-flex items-center justify-center gap-[0.5625rem] text-label font-semibold [background:none] text-[#6b697d] [border:0] py-2 px-0 ds-hover:underline [.support-banner_&]:ml-auto [.support-banner_&]:whitespace-nowrap [.support-banner_&]:text-caption ds-down-desktop:[.support-banner_&]:ml-13.5 ds-down-tablet:[.support-banner_&]:ml-auto ds-down-mobile:[.support-banner_&]:ml-13.5 ds-down-mobile:[.support-banner_&]:-mt-2.5',
        [ButtonVariant.DangerSolid]: 'danger bg-danger text-white',
        [ButtonVariant.Primary]:
          'primary bg-primary text-white hover:bg-primary-hover hover:[transform:translateY(-0.0625rem)]',
        [ButtonVariant.Secondary]: 'border border-line bg-white text-ink hover:bg-selected',
        [ButtonVariant.Peach]: 'peach-button bg-peach text-peach-ink hover:bg-peach-hover',
        [ButtonVariant.Danger]: 'danger border border-danger bg-white text-danger hover:bg-retry',
        [ButtonVariant.Ghost]: 'bg-transparent text-muted hover:bg-selected hover:text-ink',
        [ButtonVariant.FlightPrimary]:
          'flight-primary bg-flight-primary text-flight-primary-ink hover:bg-flight-primary-hover',
        [ButtonVariant.FlightSecondary]:
          'flight-secondary border border-flight-secondary-border bg-flight-secondary text-flight-secondary-ink',
      },
      size: {
        [ControlSize.Small]: 'min-h-11 px-3 py-2 text-small',
        [ControlSize.Medium]: 'min-h-11 px-5 py-3 text-small',
        [ControlSize.Large]: 'min-h-13.5 px-6 py-3 text-body',
      },
    },
    defaultVariants: { variant: ButtonVariant.Primary, size: undefined },
  },
);
