import { Button } from '../../../../components/Button/Button';
import { ButtonVariant } from '../../../../components/Button/button-styles';
import { Icon } from '../../../../components/Icon/Icon';
import { IconName } from '../../../../components/icon-names';
import { type SettingsDialogProps } from '../settings-dialog-types';

export interface DialogHeaderProps {
  onClose: SettingsDialogProps['onClose'];
}

export function DialogHeader({ onClose }: DialogHeaderProps) {
  return (
    <div className="dialog-header flex items-center justify-between gap-5 [&_h2]:text-dialog-heading">
      <h2 id="settings-title">Do seu jeito</h2>
      <Button
        variant={ButtonVariant.Icon}

        onClick={onClose}
        aria-label="Fechar ajustes"
      >
        <Icon name={IconName.Close} />
      </Button>
    </div>
  );
}
