import { Button } from '../../../../components/Button/Button';
import { ButtonVariant } from '../../../../components/Button/button-styles';
import { useState } from 'react';
import { type SettingsDialogProps } from '../settings-dialog-types';
import { ResetConfirmation } from './ResetConfirmation/ResetConfirmation';

interface ResetSectionProps {
  onReset: SettingsDialogProps['onReset'];
  onClose: SettingsDialogProps['onClose'];
}

export function ResetSection({ onReset, onClose }: ResetSectionProps) {
  const [confirm, setConfirm] = useState(false);

  return confirm ? (
    <ResetConfirmation onReset={onReset} onClose={onClose} onCancel={() => setConfirm(false)} />
  ) : (
    <Button
      variant={ButtonVariant.Text}
      className="reset-button text-[#9d5661] mt-3"
      onClick={() => setConfirm(true)}
    >
      Reiniciar expedição
    </Button>
  );
}
