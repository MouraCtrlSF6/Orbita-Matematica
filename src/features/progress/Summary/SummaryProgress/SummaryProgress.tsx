import type { SavedGame } from '../../../../game/types';
import { SummaryTotal } from './SummaryTotal/SummaryTotal';
import { SummarySectors } from './SummarySectors/SummarySectors';

const privacy = (
  <p className="privacy-note [.summary-screen_&]:[font-size:0.6875rem]! [.summary-screen_&]:mt-5">
    Este diário fica somente neste navegador. Em computadores compartilhados, outra pessoa poderá
    ver ou reiniciar o progresso.
  </p>
);

export interface SummaryProgressProps {
  count: number;
  save: SavedGame;
}

export function SummaryProgress({ count, save }: SummaryProgressProps) {
  return (
    <>
      <SummaryTotal count={count} />
      <SummarySectors save={save} />
      {privacy}
    </>
  );
}
