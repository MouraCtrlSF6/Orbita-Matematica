import { Button } from '../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../components/Button/button-styles';
interface RemoveQuestionButtonProps {
  id: string;
  title: string;
  pending: boolean;
  remove: (id: string) => void;
}

export function RemoveQuestionButton({ id, title, pending, remove }: RemoveQuestionButtonProps) {
  return (
    <Button
      variant={ButtonVariant.Danger}
      type="button"
      disabled={pending}
      onClick={() => remove(id)}
    >
      Excluir questão {title}
    </Button>
  );
}
