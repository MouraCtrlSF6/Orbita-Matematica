import { cva } from 'class-variance-authority';
import { ControlSize } from '../utils/control-styles';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Peach = 'peach',
  Danger = 'danger',
  Ghost = 'ghost',
  FlightPrimary = 'flight-primary',
  FlightSecondary = 'flight-secondary',
}

export const buttonStyles = cva(
  'button inline-flex shrink-0 items-center justify-center gap-2.5 rounded-control border-0 font-bold no-underline disabled:cursor-not-allowed disabled:opacity-[0.48] disabled:transform-none ds-reduced-motion:transition-none',
  {
    variants: {
      variant: {
        [ButtonVariant.Primary]:
          'primary bg-primary text-white hover:bg-primary-hover hover:-translate-y-px',
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
    defaultVariants: { variant: ButtonVariant.Primary, size: ControlSize.Medium },
  },
);
