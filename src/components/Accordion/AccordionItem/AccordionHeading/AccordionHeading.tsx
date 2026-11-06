import type { ComponentProps, ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { AccordionTrigger } from './AccordionTrigger/AccordionTrigger';
import type { AccordionVariant } from '../../accordion-styles';

export interface AccordionHeadingProps {
  title: ReactNode;
  variant: AccordionVariant;
  heading: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  triggerProps?: Omit<
    ComponentProps<typeof AccordionPrimitive.Trigger>,
    'asChild' | 'children' | 'type' | 'disabled'
  >;
}

export function AccordionHeading({
  heading: Heading,
  title,
  variant,
  triggerProps,
}: AccordionHeadingProps) {
  return (
    <AccordionPrimitive.Header asChild>
      <Heading className="m-0 text-body tracking-normal">
        <AccordionTrigger {...triggerProps} variant={variant}>
          {title}
        </AccordionTrigger>
      </Heading>
    </AccordionPrimitive.Header>
  );
}
