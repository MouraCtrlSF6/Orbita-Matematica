import { Button } from '../../../../components/Button/Button';
import { ButtonVariant } from '../../../../components/Button/button-styles';
import { Icon } from '../../../../components/Icon/Icon';
import { IconName } from '../../../../components/icon-names';

export interface BackToMapProps {
  onBack: () => void;
}

export function BackToMap({ onBack }: BackToMapProps) {
  return (
    <Button variant={ButtonVariant.Text} className="back-link mb-5.5" onClick={onBack}>
      <Icon name={IconName.Back} size={18} />
      Voltar ao mapa
    </Button>
  );
}
