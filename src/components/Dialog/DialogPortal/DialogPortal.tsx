import type { ComponentProps } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { mergeClasses } from '../../utils/merge-classes';
import { DialogContent, type DialogContentProps } from './DialogContent/DialogContent';

export interface DialogPortalProps extends DialogContentProps {
  container?: HTMLElement | null;
  contentProps?: ComponentProps<typeof DialogPrimitive.Content>;
}

export function DialogPortal({ container, contentProps, className, ...props }: DialogPortalProps) {
  return (
    <DialogPrimitive.Portal container={container}>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-sidebar/60 backdrop-blur-sm" />
      <DialogContent
        {...contentProps}
        {...props}
        className={mergeClasses(className, contentProps?.className)}
      />
    </DialogPrimitive.Portal>
  );
}
