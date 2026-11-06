import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '../../Button/Button';
import { ButtonVariant } from '../../Button/button-styles';
import { Spinner } from '../../Spinner/Spinner';

const loadingLabel = <Spinner label="Excluindo…" />;
const deleteIcon = <TrashIcon aria-hidden="true" className="size-5 shrink-0" />;

interface DeleteConfirmationActionsProps {
  pending: boolean;
  confirmLabel: string;
  cancel: () => void;
  confirm: () => void;
}

export function DeleteConfirmationActions({
  pending,
  confirmLabel,
  cancel,
  confirm,
}: DeleteConfirmationActionsProps) {
  return (
    <div className="flex flex-wrap justify-end gap-3" aria-busy={pending}>
      <Button variant={ButtonVariant.Secondary} disabled={pending} onClick={cancel}>
        Cancelar
      </Button>
      <Button
        variant={ButtonVariant.DangerSolid}
        disabled={pending}
        aria-busy={pending}
        onClick={confirm}
      >
        {pending ? loadingLabel : deleteIcon}
        {!pending && confirmLabel}
      </Button>
    </div>
  );
}
