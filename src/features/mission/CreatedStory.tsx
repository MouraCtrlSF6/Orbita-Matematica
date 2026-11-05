import { type CreationFieldsProps } from './creation-fields-types';

interface CreatedStoryProps {
  context: CreationFieldsProps['context'];
  variable: CreationFieldsProps['variable'];
}

export function CreatedStory({ context, variable }: CreatedStoryProps) {
  return (
    <div className="created-story [background:#f6f2fb] p-[1.0625rem] rounded-option mt-4.5 text-support [&_p]:my-2 [&_p]:mx-0 [&_>_span:last-child]:text-label [&_>_span:last-child]:text-[#7e6995]">
      <span className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
        SEU ENUNCIADO
      </span>
      <p>
        Cada um dos {variable} robôs leva 2 {context}. A base guarda mais 4 {context}. Quantos{' '}
        {context} temos ao todo?
      </p>
      <span>Regra: 2 × x + 4, com x = {variable}.</span>
    </div>
  );
}
