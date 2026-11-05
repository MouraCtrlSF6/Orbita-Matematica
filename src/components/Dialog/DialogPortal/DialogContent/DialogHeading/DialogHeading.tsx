import type { ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from '../../../../Button/Button';
import { ButtonVariant } from '../../../../Button/button-styles';

export interface DialogHeadingProps {
  title: ReactNode;
  description: ReactNode;
  closeLabel: string;
}

export function DialogHeading({ title, description, closeLabel }: DialogHeadingProps) {
  return (
    <>
      <div className="flex items-center justify-between gap-5">
        <DialogPrimitive.Title className="text-dialog-heading">{title}</DialogPrimitive.Title>
        <DialogPrimitive.Close asChild>
          <Button variant={ButtonVariant.Ghost} aria-label={closeLabel}>
            ×
          </Button>
        </DialogPrimitive.Close>
      </div>
      <DialogPrimitive.Description className="mt-3 mb-6 text-small text-muted">
        {description}
      </DialogPrimitive.Description>
    </>
  );
}
