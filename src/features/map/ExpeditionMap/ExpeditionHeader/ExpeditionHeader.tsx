import { type ExpeditionViewProps } from '../expedition-header-types';
import { ExpeditionTitle } from './ExpeditionTitle/ExpeditionTitle';

export function ExpeditionHeader({ expedition }: ExpeditionViewProps) {
  return (
    <div className="exploration-heading flex justify-between items-center gap-5 [&_h1]:text-exploration-title [&_h1]:tracking-[-0.04em] [&_p:not(.eyebrow)]:text-[#bac8df] [&_p:not(.eyebrow)]:mt-[0.5625rem] [&_p:not(.eyebrow)]:text-body ds-down-mobile:items-start ds-down-mobile:flex-col ds-down-mobile:gap-3.5">
      <ExpeditionTitle expedition={expedition} />
      <span className="exploration-count text-[#b7fbe4] [border:1px_solid_#365969] [background:#122835] rounded-status py-2.5 px-[0.9375rem] text-small whitespace-nowrap">
        {
          expedition.missions.filter((mission) => expedition.props.save.completed[mission.id])
            .length
        }{' '}
        / {expedition.missions.length} descobertas
      </span>
    </div>
  );
}
