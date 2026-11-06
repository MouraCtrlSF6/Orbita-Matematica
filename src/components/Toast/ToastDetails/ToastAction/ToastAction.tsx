import * as ToastPrimitive from '@radix-ui/react-toast';
import { Button } from '../../../Button/Button';
import { ButtonVariant } from '../../../Button/button-styles';
import { ControlSize } from '../../../utils/control-styles';

export interface ToastActionOptions {
  label: string;
  altText: string;
  onClick: () => void;
}

export function ToastAction({ label, altText, onClick }: ToastActionOptions) {
  return (
    <ToastPrimitive.Action asChild altText={altText}>
      <Button
        variant={ButtonVariant.Secondary}
        size={ControlSize.Small}
        className="mt-3"
        onClick={onClick}
      >
        {label}
      </Button>
    </ToastPrimitive.Action>
  );
}
