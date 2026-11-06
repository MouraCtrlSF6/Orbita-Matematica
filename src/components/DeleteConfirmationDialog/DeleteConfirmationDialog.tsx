import type { ReactNode } from 'react';
import { Dialog } from '../Dialog/Dialog';
import { useDeleteConfirmation } from './hooks/useDeleteConfirmation';
import { DeleteConfirmationActions } from './DeleteConfirmationActions/DeleteConfirmationActions';

interface DeleteConfirmationDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  errorMessage: string;
  successMessage: string;
  trigger: ReactNode;
  onConfirm: () => Promise<boolean | void>;
  pending?: boolean;
}

export function DeleteConfirmationDialog({
  title,
  description,
  confirmLabel,
  errorMessage,
  successMessage,
  trigger,
  onConfirm,
  pending = false,
}: DeleteConfirmationDialogProps) {
  const confirmation = useDeleteConfirmation(onConfirm, errorMessage, pending, successMessage);

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
      <DeleteConfirmationActions
        pending={confirmation.pending}
        confirmLabel={confirmLabel}
        cancel={() => confirmation.changeOpen(false)}
        confirm={confirmation.confirm}
      />
    </Dialog>
  );
}
