import type { ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { mergeClasses } from '../utils/merge-classes';
import { buttonStyles, type ButtonVariant } from './button-styles';
import type { ControlSize } from '../utils/control-styles';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  size?: ControlSize;
  asChild?: boolean;
}

export function Button({
  variant,
  size,
  asChild = false,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      type={asChild ? undefined : type}
      className={mergeClasses(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
}
