import { Button } from '../../../../../../../../components/Button/Button';
import { CubeIcon } from '@radix-ui/react-icons';
import { ButtonVariant } from '../../../../../../../../components/Button/button-styles';
import { useMissionContext } from '../../../../../hooks/useMissionContext';

export function VisualButton() {
  const { session } = useMissionContext();

  return (
    <Button
      variant={ButtonVariant.Subtle}

      aria-expanded={session.visual}
      onClick={session.toggleVisual}
    >
      <CubeIcon aria-hidden="true" />
      {session.visual ? 'Ocultar objetos' : 'Ver com objetos'}
    </Button>
  );
}
