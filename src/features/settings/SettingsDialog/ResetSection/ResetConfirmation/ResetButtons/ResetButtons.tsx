import { Button } from '../../../../../../components/Button/Button';
import { ButtonVariant } from '../../../../../../components/Button/button-styles';
import { type ResetButtonsProps } from '../../../settings-dialog-types';

export function ResetButtons({ onReset, onClose, onCancel }: ResetButtonsProps) {
  return (
    <div className="button-row [.tutorial-pilot_&]:flex [.tutorial-pilot_&]:flex-wrap [.tutorial-pilot_&]:gap-3 [.tutorial-pilot_&]:mt-[0.9375rem] flex gap-2.5 flex-wrap mt-[0.9375rem]">
      <Button
        variant={ButtonVariant.DangerSolid}

        onClick={() => {
          onReset();
          onClose();
        }}
        className="ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      >
        Sim, apagar progresso
      </Button>
      <Button
        variant={ButtonVariant.Subtle}

        onClick={onCancel}
      >
        Cancelar
      </Button>
    </div>
  );
}
