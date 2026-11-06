import { useId, type ComponentProps, type ReactNode } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { mergeClasses } from '../utils/merge-classes';
import { ControlSize } from '../utils/control-styles';
import { CheckboxVariant, checkboxLabelStyles } from './checkbox-styles';
import { CheckboxIndicator } from './CheckboxIndicator/CheckboxIndicator';

export interface CheckboxProps extends ComponentProps<typeof CheckboxPrimitive.Root> {
  label: ReactNode;
  size?: ControlSize;
  variant?: CheckboxVariant;
}

export function Checkbox({
  label,
  id,
  size = ControlSize.Medium,
  variant = CheckboxVariant.Default,
  className,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  return (
    <label
      htmlFor={controlId}
      className={mergeClasses(
        'inline-flex min-h-11 cursor-pointer items-center gap-3 text-body has-disabled:cursor-not-allowed has-disabled:opacity-50',
        checkboxLabelStyles[variant],
      )}
    >
      <CheckboxPrimitive.Root
        {...props}
        id={controlId}
        className={mergeClasses(
          'inline-flex size-5 shrink-0 items-center justify-center rounded-xs border border-selected-border bg-white p-0 text-white data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary',
          checkboxSizes[size],
          className,
        )}
      >
        <CheckboxIndicator />
      </CheckboxPrimitive.Root>
      <span>{label}</span>
    </label>
  );
}

const checkboxSizes = {
  [ControlSize.Small]: 'size-4',
  [ControlSize.Medium]: 'size-5',
  [ControlSize.Large]: 'size-6',
};
