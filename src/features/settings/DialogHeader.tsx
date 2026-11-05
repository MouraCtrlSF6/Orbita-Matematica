import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { type SettingsDialogProps } from './settings-dialog-types';

export interface DialogHeaderProps {
  onClose: SettingsDialogProps['onClose'];
}

export function DialogHeader({ onClose }: DialogHeaderProps) {
  return (
    <div className="dialog-header flex items-center justify-between gap-5 [&_h2]:text-dialog-heading">
      <h2 id="settings-title">Do seu jeito</h2>
      <button
        className="icon-button [background:#f2eff7] text-[#746283] [border:0] w-10 h-10 rounded-full grid place-items-center"
        onClick={onClose}
        aria-label="Fechar ajustes"
      >
        <Icon name={IconName.Close} />
      </button>
    </div>
  );
}
