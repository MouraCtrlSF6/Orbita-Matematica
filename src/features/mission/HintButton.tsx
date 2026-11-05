import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { type MissionGuideProps } from './mission-guide-types';

function hintLabel(openHints: number, limit: number): string {
  if (!openHints) return 'Quero uma pista';
  return openHints < limit ? 'Próximo passo' : 'Todas as dicas abertas';
}

export function HintButton({ hints, openHints, done, onHint }: MissionGuideProps) {
  return (
    <button
      className="button hint-button min-h-11 [border:1px_solid_#d8cce6] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] bg-white text-[#71558d] w-full mt-5 mr-0 mb-0 ml-0 ds-hover:[background:#f8f5fd] [.feedback_&]:mt-[1.0625rem] ds-down-tablet:max-w-80 [.tutorial-card_&]:mt-6"
      disabled={openHints >= hints.length || done}
      onClick={onHint}
    >
      <Icon name={IconName.Bulb} size={19} />
      {hintLabel(openHints, hints.length)}
    </button>
  );
}
