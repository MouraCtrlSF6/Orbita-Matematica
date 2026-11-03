import type { ReactNode } from 'react';
import { Icon } from '../../components/Icon';
import { IconName } from '../../components/icon-names';
import { ObjectModel } from '../mission/ObjectModel';
import type { TutorialPageProps } from './tutorial-view';
const guideAvatar = (
  <div className="guide-avatar" aria-hidden="true">
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
    <div className="tutorial-card" key={step} ref={cardRef} tabIndex={-1}>
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
    <button className="button primary" onClick={onNext}>
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
    <ul className="tutorial-benefits">
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
    <label className={`answer-option ${answer === value ? 'selected' : ''}`}>
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
    <fieldset className="tutorial-choices">
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
        <p className={answer === '4' ? 'tutorial-success' : undefined}>{practiceMessage(answer)}</p>
      ) : null}
    </div>
  );
}
function FinishTutorial({ answer, onFinish }: TutorialPageProps) {
  return (
    <button className="button primary" disabled={answer !== '4'} onClick={onFinish}>
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
