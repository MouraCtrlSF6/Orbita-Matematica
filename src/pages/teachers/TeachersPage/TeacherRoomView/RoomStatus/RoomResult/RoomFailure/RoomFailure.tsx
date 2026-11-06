import { Button } from '../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../components/Button/button-styles';
import { useSession } from '../../../../../../../app/contexts/hooks/useSession';
export interface RoomFailureProps {
  message: string;
}

export function RoomFailure({ message }: RoomFailureProps) {
  const { retryRoom } = useSession();

  return (
    <>
      <p role="alert">{message}</p>
      <Button
        variant={ButtonVariant.Primary}

        onClick={retryRoom}
        className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      >
        Tentar novamente
      </Button>
    </>
  );
}
