import type { ReactNode } from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { ToastAction, type ToastActionOptions } from './ToastAction/ToastAction';

export interface ToastDetailsProps {
  description?: ReactNode;
  action?: ToastActionOptions;
}

export function ToastDetails({ description, action }: ToastDetailsProps) {
  return (
    <>
      {description != null && (
        <ToastPrimitive.Description className="mt-1 text-small leading-relaxed">
          {description}
        </ToastPrimitive.Description>
      )}
      {action && <ToastAction {...action} />}
    </>
  );
}
