import type { ComponentProps, ReactNode } from 'react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { mergeClasses } from '../utils/merge-classes';

export interface SpinnerProps extends Omit<ComponentProps<'span'>, 'children'> {
  label?: ReactNode;
  size?: string | number;
}

export function Spinner({
  label = 'Carregando…',
  size = '1em',
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      aria-live="polite"
      aria-atomic="true"
      className={mergeClasses('inline-flex shrink-0 items-center', className)}
      {...props}
    >
      <ReloadIcon
        width={size}
        height={size}
        aria-hidden="true"
        focusable="false"
        className="animate-spin ds-reduced-motion:animate-none"
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}
