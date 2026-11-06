import { Button } from '../../../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../../../components/Button/button-styles';
import { Icon } from '../../../../../../../../components/Icon/Icon';
import { IconName } from '../../../../../../../../components/icon-names';
import { useMissionContext } from '../../../../../hooks/useMissionContext';

export function NarrationButton() {
  const { session } = useMissionContext();

  return (
    <Button
      variant={ButtonVariant.Subtle}

      onClick={session.toggleNarration}
    >
      <Icon name={IconName.Sound} size={18} />
      {session.narration.speaking ? 'Parar leitura' : 'Ouvir enunciado'}
    </Button>
  );
}
