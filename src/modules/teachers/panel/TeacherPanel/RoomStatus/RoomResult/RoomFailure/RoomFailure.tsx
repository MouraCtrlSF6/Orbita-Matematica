import { Button } from '../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../components/Button/button-styles';
import { useTeacherSession } from '../../../../../rooms/TeacherSession/hooks/useTeacherSession';
export interface RoomFailureProps {
  message: string;
}

export function RoomFailure({ message }: RoomFailureProps) {
  const { retryRoom } = useTeacherSession();

  return (
    <>
      <p role="alert">{message}</p>
      <Button
        variant={ButtonVariant.Primary}

        onClick={retryRoom}
        className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem]"
      >
        Tentar novamente
      </Button>
    </>
  );
}
