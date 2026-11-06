import { useMissionCatalog } from '../../../../../pages/students/hooks/useMissionCatalog';
import { Icon } from '../../../../../components/Icon/Icon';
import { IconName } from '../../../../../components/icon-names';

export interface SummaryTotalProps {
  count: number;
}

export function SummaryTotal({ count }: SummaryTotalProps) {
  const missions = useMissionCatalog();

  return (
    <div className="summary-total flex gap-5 items-center [border:1px_solid_#e2d9ef] [background:#eee8f7] rounded-aside p-[1.5625rem] my-[1.5625rem] mx-0 text-[#705488] [&_strong]:text-summary [&_strong_span]:text-formula [&_strong_span]:text-[#756086] [&_strong_span]:font-normal [&_p]:text-body ds-down-mobile:gap-3.5 ds-down-mobile:flex-wrap ds-down-mobile:[&_p]:text-small">
      <Icon name={IconName.Star} size={38} />
      <strong>
        {count}
        <span> / {missions.length}</span>
      </strong>
      <p>missões concluídas</p>
    </div>
  );
}
