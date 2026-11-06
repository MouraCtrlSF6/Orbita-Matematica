import { cva } from 'class-variance-authority';

export enum ControlVariant {
  Default = 'default',
  Invalid = 'invalid',
}

export enum ControlSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const controlStyles = cva(
  'w-full min-w-0 border border-selected-border rounded-control bg-white text-ink disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger',
  {
    variants: {
      variant: {
        [ControlVariant.Default]: '',
        [ControlVariant.Invalid]: 'border-danger',
      },
      size: {
        [ControlSize.Small]: 'min-h-11 px-3 py-2 text-small',
        [ControlSize.Medium]: 'min-h-11 px-3 py-2 text-body',
        [ControlSize.Large]: 'min-h-13.5 px-4 py-3 text-subheading',
      },
    },
    defaultVariants: { variant: ControlVariant.Default, size: ControlSize.Medium },
  },
);
