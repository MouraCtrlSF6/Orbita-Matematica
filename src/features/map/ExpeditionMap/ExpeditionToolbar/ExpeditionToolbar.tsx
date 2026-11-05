import { type ExpeditionViewProps } from '../expedition-header-types';
import { TravelButton } from './TravelButton/TravelButton';

export function ExpeditionToolbar({ expedition }: ExpeditionViewProps) {
  return (
    <div className="exploration-toolbar flex flex-wrap gap-2.5 mt-5.5 mr-0 mb-4 ml-0 [&_button:focus-visible]:[outline-color:var(--color-flight-focus)]">
      <TravelButton expedition={expedition} />
      <button
        className="button flight-secondary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-flight-secondary:bg-flight-secondary ds-flight-secondary:[border:1px_solid_var(--color-flight-secondary-border)] ds-flight-secondary:text-flight-secondary-ink ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        onClick={expedition.props.onTutorial}
      >
        Como pilotar e jogar
      </button>
      <button
        className="button flight-secondary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-flight-secondary:bg-flight-secondary ds-flight-secondary:[border:1px_solid_var(--color-flight-secondary-border)] ds-flight-secondary:text-flight-secondary-ink ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
        onClick={expedition.props.onSummary}
      >
        Ver descobertas
      </button>
    </div>
  );
}
