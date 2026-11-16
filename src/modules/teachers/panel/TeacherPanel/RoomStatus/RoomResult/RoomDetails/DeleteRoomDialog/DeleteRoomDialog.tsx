import { TrashIcon } from '@radix-ui/react-icons';
import { Button } from '../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../components/Button/button-styles';
import { DeleteConfirmationDialog } from '../../../../../../../../components/DeleteConfirmationDialog/DeleteConfirmationDialog';

export interface DeleteRoomDialogProps {
  remove: () => Promise<void>;
}

export function DeleteRoomDialog({ remove }: DeleteRoomDialogProps) {
  return (
    <div className="w-full max-w-[64rem] text-right">
      <DeleteConfirmationDialog
        title="Excluir sala?"
        description="Os nomes, o progresso e as respostas dos alunos serão apagados. Esta ação não pode ser desfeita."
        confirmLabel="Excluir sala"
        successMessage="Sala excluída com sucesso."
        errorMessage="Não foi possível confirmar a exclusão da sala. Tente novamente."
        onConfirm={remove}
        trigger={
          <Button variant={ButtonVariant.DangerSolid}>
            <TrashIcon aria-hidden="true" className="size-5 shrink-0" />
            Excluir sala
          </Button>
        }
      />
    </div>
  );
}
