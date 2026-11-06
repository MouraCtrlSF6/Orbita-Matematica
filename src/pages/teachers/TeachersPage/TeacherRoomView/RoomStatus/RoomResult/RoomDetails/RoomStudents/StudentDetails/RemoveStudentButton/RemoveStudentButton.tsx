import { Button } from '../../../../../../../../../../components/Button/Button';
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
      <Button
        variant={ButtonVariant.DangerSolid}

        disabled={pending}
        aria-label={`Remover ${name} da sala`}
        type="submit"
        className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      >
        {pending ? 'Removendo…' : 'Remover aluno'}
      </Button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
