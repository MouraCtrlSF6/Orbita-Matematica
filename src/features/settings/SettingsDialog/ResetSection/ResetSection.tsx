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
    <button
      className="text-button reset-button inline-flex items-center justify-center gap-[0.5625rem] text-label font-semibold [background:none] text-[#9d5661] [border:0] py-2 px-0 ds-hover:underline [.support-banner_&]:ml-auto [.support-banner_&]:whitespace-nowrap [.support-banner_&]:text-caption ds-down-desktop:[.support-banner_&]:ml-13.5 ds-down-tablet:[.support-banner_&]:ml-auto ds-down-mobile:[.support-banner_&]:ml-13.5 ds-down-mobile:[.support-banner_&]:-mt-2.5 mt-3"
      onClick={() => setConfirm(true)}
    >
      Reiniciar expedição
    </button>
  );
}
