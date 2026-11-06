import { useId, type ReactNode } from 'react';
import * as RadioPrimitive from '@radix-ui/react-radio-group';
import { RadioGroupVariant, radioOptionStyles } from '../radio-group-styles';

export interface RadioOptionProps {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  variant?: RadioGroupVariant;
}

export function RadioOption({
  label,
  variant = RadioGroupVariant.Default,
  ...props
}: RadioOptionProps) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={`${radioOptionStyles[variant]} cursor-pointer has-disabled:cursor-not-allowed has-disabled:opacity-50`}
    >
      <RadioPrimitive.Item
        {...props}
        id={id}
        className="flex size-4.5 shrink-0 items-center justify-center rounded-full border border-selected-border bg-white p-0"
      >
        <RadioPrimitive.Indicator className="size-2.5 rounded-full bg-primary" />
      </RadioPrimitive.Item>
      <span>{label}</span>
    </label>
  );
}
