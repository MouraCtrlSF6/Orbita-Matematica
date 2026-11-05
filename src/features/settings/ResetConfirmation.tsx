import { type ResetButtonsProps } from './settings-dialog-types';
import { ResetButtons } from './ResetButtons';

export function ResetConfirmation(props: ResetButtonsProps) {
  return (
    <div className="reset-confirm p-[0.9375rem] [background:#fff2f1] rounded-option text-support">
      <p>Apagar todas as missões concluídas e começar de novo?</p>
      <ResetButtons {...props} />
    </div>
  );
}
