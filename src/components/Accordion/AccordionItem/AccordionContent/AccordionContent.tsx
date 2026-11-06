import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { mergeClasses } from '../../../utils/merge-classes';
import { accordionContentStyles, type AccordionVariant } from '../../accordion-styles';
import type { AccordionSection } from '../AccordionItem';

interface AccordionContentProps {
  section: AccordionSection;
  variant: AccordionVariant;
}

export function AccordionContent({ section, variant }: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      {...section.contentProps}
      forceMount={section.keepMounted || undefined}
      className={contentClass(section)}
    >
      <div className="accordion-content-layout ds-reduced-motion:transition-none">
        <div className="min-h-0 overflow-hidden">
          <div className={accordionContentStyles[variant]}>{section.content}</div>
        </div>
      </div>
    </AccordionPrimitive.Content>
  );
}

function contentClass(section: AccordionSection) {
  return mergeClasses(
    'accordion-content overflow-hidden text-body leading-relaxed ds-reduced-motion:animate-none ds-reduced-motion:transition-none',
    section.keepMounted && 'accordion-content-persistent',
    section.contentProps?.className,
  );
}
