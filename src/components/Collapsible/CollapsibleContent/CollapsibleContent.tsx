import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import { mergeClasses } from '../../utils/merge-classes';
import { collapsibleContentStyles } from '../collapsible-styles';
import type { CollapsibleProps } from '../Collapsible';

interface CollapsibleContentProps extends Pick<
  CollapsibleProps,
  'children' | 'contentProps' | 'keepMounted'
> {
  variant: NonNullable<CollapsibleProps['variant']>;
}

export function CollapsibleContent({
  children,
  contentProps,
  keepMounted,
  variant,
}: CollapsibleContentProps) {
  return (
    <CollapsiblePrimitive.Content
      {...contentProps}
      forceMount={keepMounted || undefined}
      className={contentClass(keepMounted)}
    >
      <div className="collapsible-content-layout ds-reduced-motion:transition-none">
        <div className="min-h-0 overflow-hidden">
          <div className={mergeClasses(collapsibleContentStyles[variant], contentProps?.className)}>
            {children}
          </div>
        </div>
      </div>
    </CollapsiblePrimitive.Content>
  );
}

function contentClass(keepMounted: boolean | undefined) {
  return mergeClasses(
    'collapsible-content overflow-hidden ds-reduced-motion:animate-none',
    keepMounted && 'collapsible-content-persistent',
  );
}
