import { type ResetButtonsProps } from './settings-dialog-types';

export function ResetButtons({ onReset, onClose, onCancel }: ResetButtonsProps) {
  return (
    <div className="button-row [.tutorial-pilot_&]:flex [.tutorial-pilot_&]:flex-wrap [.tutorial-pilot_&]:gap-3 [.tutorial-pilot_&]:mt-[0.9375rem] flex gap-2.5 flex-wrap mt-[0.9375rem]">
      <button
        className="button danger min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-danger:bg-danger ds-danger:text-white ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        onClick={() => {
          onReset();
          onClose();
        }}
      >
        Sim, apagar progresso
      </button>
      <button
        className="subtle-button [background:#f6f5f8] [border:1px_solid_#e6e1ed] text-[#665873] rounded-subtle py-[0.5625rem] px-3 inline-flex items-center justify-center gap-[0.4375rem] text-label min-h-10 ds-hover:[background:#ece6f5] ds-down-mobile:text-caption"
        onClick={onCancel}
      >
        Cancelar
      </button>
    </div>
  );
}
