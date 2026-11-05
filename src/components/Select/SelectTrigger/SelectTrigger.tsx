import type { ComponentProps } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { mergeClasses } from '../../utils/merge-classes';
import { controlStyles, ControlVariant, type ControlSize } from '../../utils/control-styles';

export interface SelectTriggerProps extends ComponentProps<typeof SelectPrimitive.Trigger> {
  variant?: ControlVariant;
  size?: ControlSize;
  placeholder?: string;
}

export function SelectTrigger({
  variant,
  size,
  placeholder,
  className,
  'aria-invalid': invalid,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      {...props}
      aria-invalid={invalid ?? (variant === ControlVariant.Invalid || undefined)}
      className={mergeClasses(
        controlStyles({ variant, size }),
        'inline-flex items-center justify-between gap-3 text-left data-placeholder:text-muted',
        className,
      )}
    >
      <SelectPrimitive.Value placeholder={placeholder} />
      <SelectPrimitive.Icon aria-hidden>⌄</SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}
