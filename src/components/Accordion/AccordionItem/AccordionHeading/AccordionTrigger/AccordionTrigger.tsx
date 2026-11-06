import type { ComponentProps } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { mergeClasses } from '../../../../utils/merge-classes';
import type { AccordionVariant } from '../../../accordion-styles';
import { accordionTriggerStyles } from '../../../accordion-styles';

export interface AccordionTriggerProps extends Omit<
  ComponentProps<typeof AccordionPrimitive.Trigger>,
  'asChild' | 'type'
> {
  variant: AccordionVariant;
}

export function AccordionTrigger({
  children,
  variant,
  className,
  ...props
}: AccordionTriggerProps) {
  return (
    <AccordionPrimitive.Trigger
      {...props}
      type="button"
      className={mergeClasses(
        'accordion-trigger group flex min-h-11 w-full min-w-0 items-center justify-between gap-3 border-0 bg-transparent text-left text-body font-bold disabled:cursor-not-allowed disabled:opacity-50',
        accordionTriggerStyles[variant],
        className,
      )}
    >
      <span className="min-w-0">{children}</span>
      <ChevronDownIcon
        className="size-4 shrink-0 group-data-[state=open]:rotate-180"
        aria-hidden="true"
        focusable="false"
      />
    </AccordionPrimitive.Trigger>
  );
}
