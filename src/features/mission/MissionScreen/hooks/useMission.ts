import { useRef, useState, type Dispatch, type RefObject, type SetStateAction } from 'react';
import { sectors } from '../../../../content/sectors';
import { evaluate, isCorrect } from '../../../../game/math';
import { submittedAnswer, type MissionActivity } from '../../../../game/room-progress';
import {
  ChallengeKind,
  type Choice,
  type Mission,
  type MissionResult,
} from '../../../../game/types';
import { missionChoiceLabel } from '../utils/mission-choice-label';
import { useNarration } from './useNarration';
interface MissionState {
  answer: string;
  hints: number;
  visual: boolean;
  visualUsed: boolean;
  attempts: number;
  feedback: string;
  done: boolean;
  context: string;
  variable: number;
}
function initialMission(mission: Mission): MissionState {
  return {
    answer: '',
    hints: 0,
    visual: false,
    visualUsed: false,
    attempts: 0,
    feedback: '',
    done: false,
    context: 'cristais',
    variable: mission.variable,
  };
}

function retryMessage(mission: Mission): string {
  return mission.kind === ChallengeKind.Build
    ? 'Vamos ajustar a expressão. Você pode usar Desfazer e conferir as peças.'
    : 'Ainda não chegamos ao resultado. Confira sua resposta e tente novamente.';
}

function missionResult(state: MissionState, creation: boolean): MissionResult {
  return {
    hints: state.hints,
    visual: state.visualUsed,
    attempts: state.attempts + 1,
    guided: false,
    ...(creation ? { creation: { context: state.context, variable: state.variable } } : {}),
  };
}

function narrationDetail(mission: Mission, state: MissionState): string {
  if (mission.kind === ChallengeKind.Create)
    return `Cada um dos ${state.variable} robôs leva 2 ${state.context}. A base guarda mais 4. Quantos temos ao todo?`;
  return mission.kind === ChallengeKind.Build ? '' : mission.formula;
}

function narrationChoices(choices: Choice[]): string {
  const options = choices.map(({ label }, index) => `Opção ${missionChoiceLabel(index)}: ${label}`);

  return `Escolha sua resposta:
${options.join('\n')}`;
}

function narrationAnswer(mission: Mission): string {
  if (mission.kind === ChallengeKind.Choice && mission.choices?.length) {
    return narrationChoices(mission.choices);
  }

  return '';
}

function narrationText(mission: Mission, state: MissionState): string {
  return `${mission.prompt} ${narrationDetail(mission, state)}. ${narrationAnswer(mission)}`
    .replaceAll('/', ' dividido por ')
    .replaceAll('÷', ' dividido por ')
    .replaceAll('-', ' menos ')
    .replaceAll('×', ' vezes ')
    .replaceAll('+', ' mais ')
    .replaceAll('=', ' igual a ');
}

class MissionActions {
  constructor(
    private mission: Mission,
    private state: MissionState,
    private setState: Dispatch<SetStateAction<MissionState>>,
    private narration: ReturnType<typeof useNarration>,
    private feedbackRef: RefObject<HTMLDivElement | null>,
    private onComplete: (result: MissionResult) => void,
    private hintLimit: number,
    private onActivity?: (activity: MissionActivity) => void,
  ) {}
  private update(patch: Partial<MissionState>) {
    this.setState((state) => ({ ...state, ...patch }));
  }

  private complete() {
    if (this.state.done) return;
    this.narration.stop();
    this.update({ done: true, feedback: 'Boa descoberta! Você concluiu a missão.' });
    this.onComplete(missionResult(this.state, this.mission.kind === ChallengeKind.Create));
    requestAnimationFrame(() => this.feedbackRef.current?.focus());
  }

  private retry() {
    this.setState((state) => ({
      ...state,
      attempts: state.attempts + 1,
      feedback: retryMessage(this.mission),
    }));
  }

  checkAnswer = () => {
    if (!this.state.answer.trim() || this.state.done) return;
    const correct = isCorrect(this.mission, this.state.answer, this.state.variable);

    this.reportAnswer(correct);
    if (correct) this.complete();
    else this.retry();
  };
  changeAnswer = (answer: string) => this.update({ answer, feedback: '' });
  changeContext = (context: string) =>
    this.update({
      context,
      answer: '',
      feedback: '',
    });
  changeVariable = (variable: number) =>
    this.update({
      variable,
      answer: '',
      feedback: '',
    });
  private reportAnswer(correct: boolean) {
    const creation =
      this.mission.kind === ChallengeKind.Create
        ? { context: this.state.context, variable: this.state.variable }
        : {};

    this.onActivity?.({
      type: 'answer',
      attempt: {
        answer: submittedAnswer(this.mission, this.state.answer),
        correct,
        ...creation,
      },
    });
  }

  toggleVisual = () => {
    if (!this.state.visual) this.onActivity?.({ type: 'visual' });
    this.setState((state) => ({
      ...state,
      visual: !state.visual,
      visualUsed: true,
    }));
  };
  requestHint = () => {
    if (!this.state.done && this.state.hints < this.hintLimit) {
      this.onActivity?.({ type: 'hint' });
      this.setState((state) => ({ ...state, hints: Math.min(this.hintLimit, state.hints + 1) }));
    }
  };
  toggleNarration = () => {
    if (this.narration.speaking) this.narration.stop();
    else this.narration.speak(narrationText(this.mission, this.state));
  };
}
export function useMission(
  mission: Mission,
  onComplete: (result: MissionResult) => void,
  onActivity?: (activity: MissionActivity) => void,
) {
  const [state, setState] = useState(() => initialMission(mission));

  const hintLimit = Math.min(
    mission.hints.length,
    sectors.find((sector) => sector.id === mission.sectorId)!.hintLimit,
  );

  const feedbackRef = useRef<HTMLDivElement>(null);

  const narration = useNarration();

  const actions = new MissionActions(
    mission,
    state,
    setState,
    narration,
    feedbackRef,
    onComplete,
    hintLimit,
    onActivity,
  );

  return {
    ...state,
    hintLimit,
    creation: mission.kind === ChallengeKind.Create,
    expected: numericResult(mission, state.variable),
    feedbackRef,
    narration,
    checkAnswer: actions.checkAnswer,
    changeAnswer: actions.changeAnswer,
    changeContext: actions.changeContext,
    changeVariable: actions.changeVariable,
    toggleVisual: actions.toggleVisual,
    requestHint: actions.requestHint,
    toggleNarration: actions.toggleNarration,
  };
}

export type MissionSession = ReturnType<typeof useMission>;

function numericResult(mission: Mission, variable: number) {
  if (![ChallengeKind.Number, ChallengeKind.Create].includes(mission.kind)) return undefined;
  return evaluate(mission.expression, variable);
}
