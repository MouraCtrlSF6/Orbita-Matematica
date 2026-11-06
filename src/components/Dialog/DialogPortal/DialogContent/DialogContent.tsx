import type { ComponentProps } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { mergeClasses } from '../../../utils/merge-classes';
import { DialogVariant, dialogWidths } from '../../dialog-styles';
import { DialogHeading, type DialogHeadingProps } from './DialogHeading/DialogHeading';

export interface DialogContentProps
  extends Omit<ComponentProps<typeof DialogPrimitive.Content>, 'title'>, DialogHeadingProps {
  variant?: DialogVariant;
}

export function DialogContent({
  title,
  description,
  closeLabel,
  variant = DialogVariant.Default,
  children,
  className,
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Content
      {...props}
      className={mergeClasses(
        'fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2.1875rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-dialog border border-line bg-white p-7 text-ink shadow-xl',
        dialogWidths[variant],
        className,
      )}
    >
      <DialogHeading title={title} description={description} closeLabel={closeLabel} />
      {children}
    </DialogPrimitive.Content>
  );
}
