import type { ComponentProps } from 'react';
import * as RadioPrimitive from '@radix-ui/react-radio-group';
import { mergeClasses } from '../utils/merge-classes';
import type { RadioGroupVariant } from './radio-group-styles';
import { RadioOption, type RadioOptionProps } from './RadioOption/RadioOption';

export interface RadioGroupProps extends ComponentProps<typeof RadioPrimitive.Root> {
  label: string;
  options: readonly Omit<RadioOptionProps, 'variant'>[];
  variant?: RadioGroupVariant;
}

export function RadioGroup({ label, options, variant, className, ...props }: RadioGroupProps) {
  return (
    <RadioPrimitive.Root
      aria-label={label}
      {...props}
      className={mergeClasses(
        'grid gap-2 data-[orientation=horizontal]:flex data-[orientation=horizontal]:flex-wrap',
        className,
      )}
    >
      {options.map((option) => (
        <RadioOption key={option.value} {...option} variant={variant} />
      ))}
    </RadioPrimitive.Root>
  );
}
