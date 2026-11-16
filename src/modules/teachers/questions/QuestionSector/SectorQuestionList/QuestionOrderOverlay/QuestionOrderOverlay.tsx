import * as DialogPrimitive from '@radix-ui/react-dialog';
import { QuestionOrderProgress } from './QuestionOrderProgress/QuestionOrderProgress';

interface QuestionOrderOverlayProps {
  open: boolean;
}

export function QuestionOrderOverlay({ open }: QuestionOrderOverlayProps) {
  return (
    <DialogPrimitive.Root open={open}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-sidebar/20" />
        <QuestionOrderProgress />
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
