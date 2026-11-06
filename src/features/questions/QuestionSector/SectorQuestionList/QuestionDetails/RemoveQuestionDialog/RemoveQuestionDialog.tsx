import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../components/Button/button-styles';
import { DeleteConfirmationDialog } from '../../../../../../components/DeleteConfirmationDialog/DeleteConfirmationDialog';

interface RemoveQuestionDialogProps {
  id: string;
  title: string;
  pending: boolean;
  remove: (id: string) => Promise<boolean>;
}

export function RemoveQuestionDialog({ id, title, pending, remove }: RemoveQuestionDialogProps) {
  return (
    <div className="mt-4 flex justify-end">
      <DeleteConfirmationDialog
        title="Excluir questão?"
        description={`Excluir a questão “${title}” da sala? Os registros de respostas serão preservados.`}
        confirmLabel="Excluir questão"
        errorMessage="Não foi possível excluir a questão. Confira os avisos do catálogo e tente novamente."
        pending={pending}
        onConfirm={() => remove(id)}
        trigger={
          <Button variant={ButtonVariant.Danger} disabled={pending}>
            <TrashIcon aria-hidden="true" className="size-5 shrink-0" />
            Excluir questão
          </Button>
        }
      />
    </div>
  );
}
