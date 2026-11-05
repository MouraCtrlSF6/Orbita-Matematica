import { type ExpeditionViewProps } from '../../expedition-header-types';

export function TravelButton({ expedition }: ExpeditionViewProps) {
  if (expedition.sector)
    return (
      <button
        className="button flight-secondary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-flight-secondary:bg-flight-secondary ds-flight-secondary:[border:1px_solid_var(--color-flight-secondary-border)] ds-flight-secondary:text-flight-secondary-ink ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        onClick={expedition.props.onUniverse}
      >
        ← Voltar ao universo
      </button>
    );
  return (
    <button
      className="button flight-primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-flight-primary:bg-flight-primary ds-flight-primary:text-flight-primary-ink ds-flight-primary:ds-hover:bg-flight-primary-hover ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      onClick={expedition.resume}
    >
      {expedition.resumeLabel}
    </button>
  );
}
