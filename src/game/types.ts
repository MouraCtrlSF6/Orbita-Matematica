export enum ChallengeKind {
  Choice = 'choice',
  Number = 'number',
  Text = 'text',
  Build = 'build',
  Create = 'create',
}

export enum Operation {
  Add = 'add',
  Subtract = 'subtract',
  Multiply = 'multiply',
  Divide = 'divide',
}

export type Expression =
  | { type: 'constant'; value: number }
  | { type: 'variable' }
  | { type: 'operation'; operation: Operation; left: Expression; right: Expression };

export interface Choice {
  label: string;
  value: string;
}

export interface VisualModel {
  groups: number;
  perGroup: number;
  extra: number;
  label: string;
}

export interface Mission {
  id: string;
  sectorId: string;
  title: string;
  objective: string;
  skill: string;
  prompt: string;
  kind: ChallengeKind;
  expression?: Expression;
  variable: number;
  formula: string;
  choices?: Choice[];
  correctChoice?: string;
  tokens?: string[];
  expectedTokens?: string[];
  equivalentTokens?: string[][];
  hints: string[];
  explanation: string;
  visual?: VisualModel;
  expectedAnswer?: string;
}

export interface Sector {
  hintLimit: 1 | 2;
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  color: string;
  planet: string;
}

export interface MissionResult {
  hints: number;
  visual: boolean;
  attempts: number;
  guided: boolean;
  creation?: { context: string; variable: number };
}

export interface SavedGame {
  version: 1;
  completed: Record<string, MissionResult>;
  tutorialDone: boolean;
  lastMissionId: string | null;
  preferences: { largeText: boolean; reducedMotion: boolean; soundEnabled: boolean };
}
