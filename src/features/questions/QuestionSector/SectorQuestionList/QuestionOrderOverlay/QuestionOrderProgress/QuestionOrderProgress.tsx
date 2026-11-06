import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Spinner } from '../../../../../../components/Spinner/Spinner';
import { useOverlayFocus } from '../hooks/useOverlayFocus';

export function QuestionOrderProgress() {
  const focus = useOverlayFocus();

  return (
    <DialogPrimitive.Content
      aria-describedby={undefined}
      aria-busy="true"
      className="fixed inset-0 z-60 grid place-items-center outline-none"
      onEscapeKeyDown={(event) => event.preventDefault()}
      onPointerDownOutside={(event) => event.preventDefault()}
      onOpenAutoFocus={focus.capture}
      onCloseAutoFocus={focus.restore}
    >
      <DialogPrimitive.Title className="sr-only">
        Salvando a ordem das questões
      </DialogPrimitive.Title>
      <Spinner
        role="status"
        label="Salvando a ordem das questões…"
        size="3rem"
        className="text-primary"
      />
    </DialogPrimitive.Content>
  );
}
