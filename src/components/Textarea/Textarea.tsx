import type { ComponentProps } from 'react';
import { mergeClasses } from '../utils/merge-classes';
import { controlStyles, ControlVariant, type ControlSize } from '../utils/control-styles';

export interface TextareaProps extends ComponentProps<'textarea'> {
  variant?: ControlVariant;
  size?: ControlSize;
}

export function Textarea({
  variant,
  size,
  className,
  'aria-invalid': invalid,
  ...props
}: TextareaProps) {
  return (
    <textarea
      {...props}
      aria-invalid={invalid ?? (variant === ControlVariant.Invalid || undefined)}
      className={mergeClasses(controlStyles({ variant, size }), 'min-h-24 resize-y', className)}
    />
  );
}
