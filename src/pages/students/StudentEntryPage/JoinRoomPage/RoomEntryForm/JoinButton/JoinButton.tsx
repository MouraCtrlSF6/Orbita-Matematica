import { Button } from '../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../components/Button/button-styles';
export interface JoinButtonProps {
  joining: boolean;
}

export function JoinButton({ joining }: JoinButtonProps) {
  return (
    <Button
      variant={ButtonVariant.Primary}

      disabled={joining}
      type="submit"
      className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
    >
      {joining ? 'Entrando…' : 'Entrar na sala'}
    </Button>
  );
}
