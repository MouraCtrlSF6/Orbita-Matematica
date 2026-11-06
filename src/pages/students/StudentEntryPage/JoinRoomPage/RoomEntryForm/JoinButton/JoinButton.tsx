import { Button } from '../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../components/Button/button-styles';
import { Spinner } from '../../../../../../components/Spinner/Spinner';

const loadingLabel = <Spinner label="Entrando na sala…" />;

export interface JoinButtonProps {
  joining: boolean;
}

export function JoinButton({ joining }: JoinButtonProps) {
  return (
    <Button
      variant={ButtonVariant.Primary}
      aria-busy={joining}
      disabled={joining}
      type="submit"
      className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
    >
      {joining ? loadingLabel : 'Entrar na sala'}
    </Button>
  );
}
