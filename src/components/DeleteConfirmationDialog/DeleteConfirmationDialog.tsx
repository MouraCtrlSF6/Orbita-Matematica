import type { ReactNode } from 'react';
import { TrashIcon } from '@radix-ui/react-icons';
import { Dialog } from '../Dialog/Dialog';
import { Button } from '../Button/Button';
import { ButtonVariant } from '../Button/button-styles';
import { useDeleteConfirmation } from './hooks/useDeleteConfirmation';

interface DeleteConfirmationDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  errorMessage: string;
  trigger: ReactNode;
  onConfirm: () => Promise<boolean | void>;
  pending?: boolean;
}

export function DeleteConfirmationDialog({
  title,
  description,
  confirmLabel,
  errorMessage,
  trigger,
  onConfirm,
  pending = false,
}: DeleteConfirmationDialogProps) {
  const confirmation = useDeleteConfirmation(onConfirm, errorMessage, pending);
  const busy = pending || confirmation.pending;

  return (
    <Dialog
      title={title}
      description={description}
      trigger={trigger}
      open={confirmation.open}
      onOpenChange={confirmation.changeOpen}
      closeLabel="Cancelar exclusão"
    >
      {confirmation.error && (
        <p role="alert" className="mb-4 text-danger">
          {confirmation.error}
        </p>
      )}
      <div className="flex flex-wrap justify-end gap-3" aria-busy={busy}>
        <Button
          variant={ButtonVariant.Secondary}
          disabled={busy}
          onClick={() => confirmation.changeOpen(false)}
        >
          Cancelar
        </Button>
        <Button variant={ButtonVariant.DangerSolid} disabled={busy} onClick={confirmation.confirm}>
          <TrashIcon aria-hidden="true" className="size-5 shrink-0" />
          {busy ? 'Excluindo…' : confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}
