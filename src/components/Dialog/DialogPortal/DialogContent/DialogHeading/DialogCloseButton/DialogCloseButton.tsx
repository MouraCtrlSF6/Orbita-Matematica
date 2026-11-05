import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Button } from '../../../../../Button/Button';
import { ButtonVariant } from '../../../../../Button/button-styles';

export interface DialogCloseButtonProps {
  label: string;
}

export function DialogCloseButton({ label }: DialogCloseButtonProps) {
  return (
    <DialogPrimitive.Close asChild>
      <Button variant={ButtonVariant.Icon} aria-label={label}>
        <Cross2Icon aria-hidden="true" />
      </Button>
    </DialogPrimitive.Close>
  );
}
