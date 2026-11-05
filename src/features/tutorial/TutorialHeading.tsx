export interface TutorialHeadingProps {
  step: number;
}

export function TutorialHeading({ step }: TutorialHeadingProps) {
  return (
    <>
      <p className="eyebrow text-eyebrow tracking-[0.1125rem] font-bold text-[#665d75] ds-down-mobile:text-micro ds-down-mobile:tracking-[0.0875rem] [.exploration-heading_&]:text-[#89e5d2] [.exploration-heading_&]:mb-2.5 [.mission-aside_&]:text-micro [.mission-aside_&]:tracking-[0.0625rem] ds-down-mobile:[.mission-heading_&]:leading-[1.8]">
        ANTES DE DECOLAR · PASSO {step + 2} DE 4
      </p>
      <h1>{step === -1 ? 'Seu primeiro voo.' : 'Seu primeiro contato com a álgebra.'}</h1>
    </>
  );
}
