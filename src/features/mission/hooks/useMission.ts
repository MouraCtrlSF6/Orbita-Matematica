import { useRef, useState, type Dispatch, type RefObject, type SetStateAction } from 'react';
import { evaluate, isCorrect } from '../../../game/math';
import { ChallengeKind, type Mission, type MissionResult } from '../../../game/types';
import { useNarration } from './useNarration';
import { sectors } from '../../../content/sectors';
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
    ? `Vamos ajustar a expressão. ${mission.hints[0]} Você pode usar Desfazer ou pedir uma pista.`
    : `Ainda não chegamos ao resultado. ${mission.hints[0]} Tente novamente ou peça uma pista.`;
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
function narrationText(mission: Mission, state: MissionState): string {
  return `${mission.prompt} ${narrationDetail(mission, state)}`
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
    if (isCorrect(this.mission, this.state.answer, this.state.variable)) this.complete();
    else this.retry();
  };
  changeAnswer = (answer: string) => this.update({ answer, feedback: '' });
  changeContext = (context: string) => this.update({ context, answer: '', feedback: '' });
  changeVariable = (variable: number) => this.update({ variable, answer: '', feedback: '' });
  toggleVisual = () =>
    this.setState((state) => ({ ...state, visual: !state.visual, visualUsed: true }));
  requestHint = () => {
    if (!this.state.done)
      this.setState((state) => ({ ...state, hints: Math.min(this.hintLimit, state.hints + 1) }));
  };
  toggleNarration = () => {
    if (this.narration.speaking) this.narration.stop();
    else this.narration.speak(narrationText(this.mission, this.state));
  };
}
export function useMission(mission: Mission, onComplete: (result: MissionResult) => void) {
  const [state, setState] = useState(() => initialMission(mission));
  const hintLimit = sectors.find((sector) => sector.id === mission.sectorId)!.hintLimit;
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
  );
  return {
    ...state,
    hintLimit,
    creation: mission.kind === ChallengeKind.Create,
    expected: evaluate(mission.expression, state.variable),
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
