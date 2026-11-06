import * as ToastPrimitive from '@radix-ui/react-toast';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '../../../Button/Button';
import { ButtonVariant } from '../../../Button/button-styles';

interface ToastCloseButtonProps {
  label: string;
}

export function ToastCloseButton({ label }: ToastCloseButtonProps) {
  return (
    <ToastPrimitive.Close asChild>
      <Button
        variant={ButtonVariant.Ghost}
        className="size-11 min-h-11 shrink-0 p-0 text-current hover:bg-transparent hover:text-current"
        aria-label={label}
      >
        <Cross2Icon aria-hidden="true" />
      </Button>
    </ToastPrimitive.Close>
  );
}
