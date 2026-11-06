import type { ComponentProps, ReactNode } from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { mergeClasses } from '../../utils/merge-classes';
import { AccordionVariant, accordionItemStyles, accordionContentStyles } from '../accordion-styles';
import { AccordionHeading, type AccordionHeadingProps } from './AccordionHeading/AccordionHeading';

export interface AccordionSection {
  value: string;
  title: ReactNode;
  content: ReactNode;
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
      disabled={section.disabled}
      className={mergeClasses(
        'accordion-item min-w-0 wrap-anywhere',
        accordionItemStyles[variant],
        section.className,
      )}
    >
      <AccordionHeading
        title={section.title}
        variant={variant}
        heading={heading}
        triggerProps={section.triggerProps}
      />
      <AccordionPrimitive.Content
        {...section.contentProps}
        forceMount={section.keepMounted || undefined}
        className={mergeClasses(
          'accordion-content text-body leading-relaxed data-[state=closed]:hidden',
          accordionContentStyles[variant],
          section.contentProps?.className,
        )}
      >
        {section.content}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}
