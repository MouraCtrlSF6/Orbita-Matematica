import type { ReactNode, Ref } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { mergeClasses } from '../utils/merge-classes';
import { AccordionVariant } from './accordion-styles';
import { AccordionItem, type AccordionSection } from './AccordionItem/AccordionItem';

interface AccordionBaseProps {
  label: string;
  items: readonly AccordionSection[];
  variant?: AccordionVariant;
  heading?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  ref?: Ref<HTMLDivElement>;
}

export interface AccordionSingleProps
  extends
    Omit<AccordionPrimitive.AccordionSingleProps, 'children' | 'asChild'>,
    AccordionBaseProps {}

export interface AccordionMultipleProps
  extends
    Omit<AccordionPrimitive.AccordionMultipleProps, 'children' | 'asChild'>,
    AccordionBaseProps {}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;

export function Accordion({
  label,
  items,
  variant = AccordionVariant.Default,
  heading = 'h3',
  className,
  ...props
}: AccordionProps): ReactNode {
  return (
    <AccordionPrimitive.Root
      role="group"
      aria-label={label}
      {...props}
      className={mergeClasses('accordion grid w-full min-w-0 gap-3', className)}
    >
      {items.map((item) => (
        <AccordionItem key={item.value} section={item} variant={variant} heading={heading} />
      ))}
    </AccordionPrimitive.Root>
  );
}
