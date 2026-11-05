import type { ComponentProps } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { mergeClasses } from '../utils/merge-classes';
import type { ControlVariant, ControlSize } from '../utils/control-styles';
import type { SelectOptionProps } from './SelectContent/SelectOptions/SelectOption/SelectOption';
import { SelectContent } from './SelectContent/SelectContent';
import { SelectTrigger } from './SelectTrigger/SelectTrigger';

export interface SelectProps extends ComponentProps<typeof SelectPrimitive.Root> {
  options: readonly SelectOptionProps[];
  label: string;
  id?: string;
  placeholder?: string;
  variant?: ControlVariant;
  size?: ControlSize;
  className?: string;
  triggerProps?: ComponentProps<typeof SelectPrimitive.Trigger>;
  contentProps?: ComponentProps<typeof SelectPrimitive.Content>;
  portalContainer?: HTMLElement | null;
}

export function Select({
  options,
  label,
  id,
  placeholder = 'Selecione',
  variant,
  size,
  className,
  triggerProps,
  contentProps,
  portalContainer,
  ...props
}: SelectProps) {
  return (
    <SelectPrimitive.Root {...props}>
      <SelectTrigger
        id={id}
        aria-label={label}
        placeholder={placeholder}
        variant={variant}
        size={size}
        {...triggerProps}
        className={mergeClasses(className, triggerProps?.className)}
      />
      <SelectPrimitive.Portal container={portalContainer}>
        <SelectContent options={options} {...contentProps} />
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
