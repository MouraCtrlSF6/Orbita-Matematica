import { AccordionLeading } from './AccordionLeading/AccordionLeading';
import { AccordionContent } from './AccordionContent/AccordionContent';
import type { ComponentProps, ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { mergeClasses } from '../../utils/merge-classes';
import { AccordionVariant, accordionItemStyles } from '../accordion-styles';
import { AccordionHeading, type AccordionHeadingProps } from './AccordionHeading/AccordionHeading';

export interface AccordionSection {
  value: string;
  title: ReactNode;
  content: ReactNode;
  actions?: ReactNode;
  leading?: ReactNode;
  disabled?: boolean;
  keepMounted?: boolean;
  className?: string;
  triggerProps?: AccordionHeadingProps['triggerProps'];
  contentProps?: Omit<
    ComponentProps<typeof AccordionPrimitive.Content>,
    'asChild' | 'children' | 'forceMount'
  >;
}

export interface AccordionItemProps {
  section: AccordionSection;
  variant: AccordionVariant;
  heading: AccordionHeadingProps['heading'];
}

export function AccordionItem({ section, variant, heading }: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      value={section.value}
      data-accordion-value={section.value}
      disabled={section.disabled}
      className={mergeClasses(
        'accordion-item relative min-w-0 wrap-anywhere',
        accordionItemStyles[variant],
        section.className,
      )}
    >
      <AccordionLeading>{section.leading}</AccordionLeading>
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <AccordionHeading
          title={section.title}
          variant={variant}
          heading={heading}
          triggerProps={section.triggerProps}
        />
        {section.actions}
      </div>
      <AccordionContent section={section} variant={variant} />
    </AccordionPrimitive.Item>
  );
}
