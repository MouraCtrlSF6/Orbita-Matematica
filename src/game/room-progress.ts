import { missions } from '../content/missions';
import { sectors } from '../content/sectors';
import { ChallengeKind, type Choice, type Mission, type SavedGame } from './types';

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface ProvidedAnswer {
  order: number;
  answer: Choice;
  correct: boolean;
  context?: string;
  variable?: number;
}

export interface RoomMission {
  missionNumber: number;
  missionTitle?: string;
  missionStatus: ProgressStatus;
  usedHints: boolean;
  usedVisuals: boolean;
  providedAnswers?: Record<string, ProvidedAnswer>;
}

export interface RoomSector {
  sectorName: string;
  sectorStatus: ProgressStatus;
  missions: Record<string, RoomMission>;
}

export interface RoomStudent {
  studentId: string;
  name: string;
  currentSector?: string;
  sectors: Record<string, RoomSector>;
}

export type MissionActivity =
  { type: 'hint' | 'visual' } | { type: 'answer'; attempt: Omit<ProvidedAnswer, 'order'> };

export function sectorStatus(missions: Record<string, RoomMission>): ProgressStatus {
  const entries = Object.values(missions);
  if (allCompleted(entries)) return 'completed';
  return entries.some((mission) => mission.missionStatus !== 'not_started')
    ? 'in_progress'
    : 'not_started';
}

function allCompleted(missions: RoomMission[]) {
  return missions.every((mission) => mission.missionStatus === 'completed');
}

function initialMission(mission: Mission, index: number, save: SavedGame): RoomMission {
  const result = save.completed[mission.id];
  return {
    missionNumber: index + 1,
    missionTitle: mission.title,
    missionStatus: result ? 'completed' : 'not_started',
    usedHints: Boolean(result?.hints),
    usedVisuals: Boolean(result?.visual),
  };
}

function initialSector(
  sector: (typeof sectors)[number],
  save: SavedGame,
  catalog: Mission[],
): RoomSector {
  const records = Object.fromEntries(
    catalog
      .filter((mission) => mission.sectorId === sector.id)
      .map((mission, index) => [mission.id, initialMission(mission, index, save)]),
  );
  return { sectorName: sector.name, sectorStatus: sectorStatus(records), missions: records };
}

export function initialRoomStudent(
  studentId: string,
  name: string,
  save: SavedGame,
  catalog: Mission[] = missions,
): RoomStudent {
  return {
    studentId,
    name,
    sectors: Object.fromEntries(
      sectors.map((sector) => [sector.id, initialSector(sector, save, catalog)]),
    ),
  };
}

const answerLabels = {
  [ChallengeKind.Choice]: 'Alternativa',
  [ChallengeKind.Number]: 'Resposta numérica',
  [ChallengeKind.Text]: 'Resposta discursiva',
  [ChallengeKind.Build]: 'Expressão montada',
  [ChallengeKind.Create]: 'Problema criado',
};

export function submittedAnswer(mission: Mission, value: string): Choice {
  return (
    mission.choices?.find((choice) => choice.value === value) ?? {
      label: answerLabels[mission.kind],
      value,
    }
  );
}
