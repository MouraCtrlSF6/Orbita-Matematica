import type { TutorialPageProps } from '../../../tutorial-view';
import { NextStep } from '../NextStep/NextStep';

const introduction = (
  <>
    <h2>Oi! Eu sou a Luma.</h2>
    <p>
      Vou acompanhar você nesta expedição. Cada missão tem um desafio curto e você pode pedir ajuda
      quando quiser.
    </p>
    <ul className="tutorial-benefits [list-style:none] p-0 grid gap-[0.9375rem] my-[1.5625rem] mx-0 text-root text-[#716580]">
      <li>◉ Ouça o enunciado, se houver uma voz disponível.</li>
      <li>◇ Veja as quantidades com objetos.</li>
      <li>✦ Abra pistas, uma de cada vez.</li>
    </ul>
  </>
);

interface LumaIntroductionProps {
  onNext: TutorialPageProps['onNext'];
}

export function LumaIntroduction(props: LumaIntroductionProps) {
  return (
    <>
      {introduction}
      <NextStep onNext={props.onNext}>Conhecer uma variável</NextStep>
    </>
  );
}
