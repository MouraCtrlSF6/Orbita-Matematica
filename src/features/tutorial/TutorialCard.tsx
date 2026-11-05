import type { ReactNode } from 'react';
import type { TutorialPageProps } from './tutorial-view';

const guideAvatar = (
  <div
    className="guide-avatar grid place-items-center [border:1px_solid_#ccbce4] [background:#e0d3f2] w-12 h-12 rounded-dialog text-[#8665ad] text-guide mb-4.5 ds-down-tablet:[.mission-aside_&]:[float:right]"
    aria-hidden="true"
  >
    ✦
  </div>
);

export interface TutorialCardProps {
  cardRef: TutorialPageProps['cardRef'];
  step: number;
  children: ReactNode;
}

export function TutorialCard({ cardRef, step, children }: TutorialCardProps) {
  return (
    <div
      className="tutorial-card max-w-190 bg-white [border:1px_solid_var(--line)] rounded-card p-[2.1875rem] mt-7.5 mr-auto mb-0 ml-auto [&_h2]:mt-2.5 [&_h2]:mr-0 [&_h2]:mb-4.5 [&_h2]:ml-0 [&_p]:text-section [&_p]:leading-[1.8] ds-down-mobile:p-[1.4375rem] ds-down-mobile:[&_p]:text-root ds-down-mobile:[&_h2]:text-formula"
      key={step}
      ref={cardRef}
      tabIndex={-1}
    >
      {guideAvatar}
      {children}
    </div>
  );
}
