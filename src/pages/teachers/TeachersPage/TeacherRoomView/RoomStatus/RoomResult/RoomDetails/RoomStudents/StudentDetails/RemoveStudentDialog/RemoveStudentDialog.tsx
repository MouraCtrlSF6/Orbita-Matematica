import { TrashIcon } from '@radix-ui/react-icons';
import { TooltipButton } from '../../../../../../../../../../components/Tooltip/TooltipButton/TooltipButton';
import { ButtonVariant } from '../../../../../../../../../../components/Button/button-styles';
import { DeleteConfirmationDialog } from '../../../../../../../../../../components/DeleteConfirmationDialog/DeleteConfirmationDialog';
import { useSession } from '../../../../../../../../../../app/contexts/hooks/useSession';
import { removeStudent } from '../../../../../../../../../../infrastructure/firebase/rooms';

export interface RemoveStudentDialogProps {
  studentId: string;
  name: string;
}

export function RemoveStudentDialog({ studentId, name }: RemoveStudentDialogProps) {
  const { localSessionId } = useSession();

  return (
    <DeleteConfirmationDialog
      title="Remover aluno?"
      description={`Remover ${name} da sala? O registro será apagado e o jogo continuará aberto para o aluno.`}
      confirmLabel="Remover aluno"
      successMessage="Aluno removido com sucesso."
      errorMessage="Não foi possível remover o aluno. Tente novamente."
      onConfirm={() => removeStudent(localSessionId, studentId)}
      trigger={
        <TooltipButton
          variant={ButtonVariant.Danger}
          tooltip="Remover aluno"
          aria-label={`Remover ${name} da sala`}
          className="size-11 p-0"
        >
          <TrashIcon className="size-5" aria-hidden="true" />
        </TooltipButton>
      }
    />
  );
}
