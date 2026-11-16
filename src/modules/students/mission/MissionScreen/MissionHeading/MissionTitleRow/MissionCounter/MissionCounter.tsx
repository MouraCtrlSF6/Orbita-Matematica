export interface MissionCounterProps {
  number: number;
  total: number;
}

export function MissionCounter({ number, total }: MissionCounterProps) {
  return (
    <span className="mission-counter text-body font-bold whitespace-nowrap [&_span]:font-normal [&_span]:text-[#62626d] ds-down-mobile:text-small">
      Missão {number} <span>de {total}</span>
    </span>
  );
}
