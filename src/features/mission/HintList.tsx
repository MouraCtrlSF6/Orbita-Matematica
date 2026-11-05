import { type MissionGuideProps } from './mission-guide-types';
import { Hint } from './Hint';

interface HintListProps {
  hints: MissionGuideProps['hints'];
  openHints: MissionGuideProps['openHints'];
}

export function HintList({ hints, openHints }: HintListProps) {
  return (
    <ol
      className="hints-list [list-style:none] p-0 m-0 [&_li]:flex [&_li]:items-start [&_li]:gap-[0.5625rem] [&_li]:mt-4.5 [&_li_>_span]:grid [&_li_>_span]:place-items-center [&_li_>_span]:w-5 [&_li_>_span]:h-5 [&_li_>_span]:shrink-0 [&_li_>_span]:[background:#e1d6ee] [&_li_>_span]:text-[#73588f] [&_li_>_span]:rounded-full [&_li_>_span]:text-caption [&_li_>_span]:font-bold [&_p]:text-small [&_p]:text-[#5b5069] ds-down-tablet:grid ds-down-tablet:gap-3"
      aria-live="polite"
    >
      {hints.slice(0, openHints).map((hint, index) => (
        <Hint key={hint} text={hint} index={index} />
      ))}
    </ol>
  );
}
