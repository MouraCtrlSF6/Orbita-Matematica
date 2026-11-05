import type { ReactNode } from 'react';
import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { ObjectModel } from '../mission/ObjectModel';
import type { TutorialPageProps } from './tutorial-view';
const guideAvatar = (
  <div
    className="guide-avatar grid place-items-center [border:1px_solid_#ccbce4] [background:#e0d3f2] w-12 h-12 rounded-dialog text-[#8665ad] text-guide mb-4.5 ds-down-tablet:[.mission-aside_&]:[float:right]"
    aria-hidden="true"
  >
    ✦
  </div>
);
function TutorialCard({
  cardRef,
  step,
  children,
}: {
  cardRef: TutorialPageProps['cardRef'];
  step: number;
  children: ReactNode;
}) {
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
function NextStep({
  onNext,
  children,
}: {
  onNext: TutorialPageProps['onNext'];
  children: ReactNode;
}) {
  return (
    <button
      className="button primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-primary:bg-primary ds-primary:text-white ds-primary:ds-hover:bg-primary-hover ds-primary:ds-hover:[transform:translateY(-0.0625rem)] ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      onClick={onNext}
    >
      {children}
      <Icon name={IconName.Arrow} size={18} />
    </button>
  );
}
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
function LumaIntroduction(props: TutorialPageProps) {
  return (
    <>
      {introduction}
      <NextStep onNext={props.onNext}>Conhecer uma variável</NextStep>
    </>
  );
}
const variableExplanation = (
  <>
    <h2>Uma letra pode representar uma quantidade.</h2>
    <p>
      Cada robô precisa de 2 cristais. Chamamos a quantidade de robôs de <strong>x</strong>. O total
      de cristais é <strong>2 × x</strong>.
    </p>
  </>
);
const substitutionExample = (
  <p>
    Para 3 robôs, x = 3. Trocamos a letra pelo número: <strong>2 × 3 = 6</strong>.
  </p>
);
function VariableLesson(props: TutorialPageProps) {
  return (
    <>
      {variableExplanation}
      <ObjectModel model={{ groups: 3, perGroup: 2, extra: 0, label: 'cristais' }} />
      {substitutionExample}
      <NextStep onNext={props.onNext}>Agora é sua vez</NextStep>
    </>
  );
}
function PracticeOption({
  value,
  answer,
  onAnswer,
}: {
  value: string;
  answer: string;
  onAnswer: TutorialPageProps['onAnswer'];
}) {
  return (
    <label
      className={`answer-option relative flex items-center gap-[0.8125rem] py-3.5 px-4 [border:1px_solid_#e2e1ea] rounded-option my-[0.5625rem] mx-0 bg-white text-body cursor-pointer min-h-13.5 ds-hover:[border-color:#b5a4d1] ds-hover:[background:#faf8fd] ds-selected:border-selected-border ds-selected:bg-selected [&_input]:[accent-color:#7a60b6] [&_input]:w-[1.0625rem] [&_input]:h-[1.0625rem] [&_input]:shrink-0 ${answer === value ? 'selected' : ''}`}
    >
      <input
        type="radio"
        name="tutorial-answer"
        value={value}
        checked={answer === value}
        onChange={() => onAnswer(value)}
      />
      {value} cristais
    </label>
  );
}
function PracticeChoices(props: TutorialPageProps) {
  return (
    <fieldset className="tutorial-choices [border:0] p-0 mt-[1.6875rem] mr-0 mb-[0.9375rem] ml-0 min-w-0 [&_legend]:font-semibold [&_legend]:text-support [&_legend]:mb-3 flex flex-wrap gap-2.5 [&_label]:[flex:1] [&_label]:min-w-35">
      <legend>Escolha o total de cristais</legend>
      {['2', '4', '6'].map((value) => (
        <PracticeOption key={value} value={value} answer={props.answer} onAnswer={props.onAnswer} />
      ))}
    </fieldset>
  );
}
function practiceMessage(answer: string): string {
  return answer === '4'
    ? 'Isso! 2 × 2 = 4. Você já fez sua primeira substituição.'
    : 'São 2 grupos de 2: 2 + 2 = 4. Tente escolher esse total.';
}
function PracticeFeedback({ answer }: TutorialPageProps) {
  return (
    <div role="status">
      {answer ? (
        <p className={answer === '4' ? 'tutorial-success text-[#3c775d]' : undefined}>
          {practiceMessage(answer)}
        </p>
      ) : null}
    </div>
  );
}
function FinishTutorial({ answer, onFinish }: TutorialPageProps) {
  return (
    <button
      className="button primary min-h-11 [border:0] rounded-control inline-flex justify-center items-center gap-[0.6875rem] py-3 px-5 text-small font-bold no-underline ds-primary:bg-primary ds-primary:text-white ds-primary:ds-hover:bg-primary-hover ds-primary:ds-hover:[transform:translateY(-0.0625rem)] ds-disabled:[opacity:0.48] ds-disabled:[transform:none]! ds-down-mobile:[.exploration-toolbar_&]:[flex:1_1_auto] [.feedback_&]:mt-[1.0625rem] [.tutorial-card_&]:mt-6"
      disabled={answer !== '4'}
      onClick={onFinish}
    >
      Pronto para explorar
      <Icon name={IconName.Rocket} size={18} />
    </button>
  );
}
const practiceQuestion = (
  <>
    <h2>Vamos experimentar?</h2>
    <p>Agora temos 2 robôs: x = 2. Se cada um usa 2 cristais, quanto vale 2 × x?</p>
  </>
);
function AlgebraPractice(props: TutorialPageProps) {
  return (
    <>
      {practiceQuestion}
      <PracticeChoices {...props} />
      <PracticeFeedback {...props} />
      <FinishTutorial {...props} />
    </>
  );
}
const pages = [LumaIntroduction, VariableLesson, AlgebraPractice];
export function AlgebraTutorial(props: TutorialPageProps) {
  const Page = pages[props.step];
  return (
    <TutorialCard cardRef={props.cardRef} step={props.step}>
      <Page {...props} />
    </TutorialCard>
  );
}
