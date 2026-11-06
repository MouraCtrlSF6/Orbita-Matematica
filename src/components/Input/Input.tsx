import type { ComponentProps } from 'react';
import { mergeClasses } from '../utils/merge-classes';
import { controlStyles, ControlVariant, type ControlSize } from '../utils/control-styles';

export interface InputProps extends Omit<ComponentProps<'input'>, 'size'> {
  variant?: ControlVariant;
  size?: ControlSize;
  nativeSize?: number;
}

export function Input({
  variant,
  size,
  nativeSize,
  className,
  'aria-invalid': invalid,
  ...props
}: InputProps) {
  return (
    <input
      size={nativeSize}
      aria-invalid={invalid ?? (variant === ControlVariant.Invalid || undefined)}
      className={mergeClasses(controlStyles({ variant, size }), className)}
      {...props}
    />
  );
}
