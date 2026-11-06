import { Button } from '../../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../../components/Button/button-styles';
export interface DeleteButtonProps {
  pending: boolean;
}

export function DeleteButton({ pending }: DeleteButtonProps) {
  return (
    <Button
      variant={ButtonVariant.DangerSolid}

      disabled={pending}
      type="submit"
      className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
    >
      {pending ? 'Excluindo…' : 'Excluir sala'}
    </Button>
  );
}
