import { TrashIcon } from '@radix-ui/react-icons';
import { TooltipButton } from '../../../../../../../../../../components/Tooltip/TooltipButton/TooltipButton';
import { ButtonVariant } from '../../../../../../../../../../components/Button/button-styles';
import { useRemoveStudent } from './hooks/useRemoveStudent';

export interface RemoveStudentButtonProps {
  studentId: string;
  name: string;
}

export function RemoveStudentButton({ studentId, name }: RemoveStudentButtonProps) {
  const { error, action, pending } = useRemoveStudent(studentId, name);

  return (
    <form action={action}>
      <TooltipButton
        variant={ButtonVariant.Danger}
        tooltip="Remover aluno"
        aria-busy={pending}
        disabled={pending}
        aria-label={`Remover ${name} da sala`}
        type="submit"
        className="size-11 p-0"
      >
        <TrashIcon className="size-5" aria-hidden="true" />
      </TooltipButton>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
