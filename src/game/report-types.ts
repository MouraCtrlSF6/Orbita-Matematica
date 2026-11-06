import type { RoomCatalog } from './room-catalog';
import type { RoomStudent, ProvidedAnswer } from './room-progress';

export interface ReportSnapshot {
  roomId: string;
  roomName: string;
  generatedAt: string;
  catalog: RoomCatalog;
  students: RoomStudent[];
}

export interface ReportRecord {
  studentId: string;
  studentName: string;
  sectorId: string;
  missionId: string;
  title: string;
  status: string;
  hints: boolean | null;
  historical: boolean;
  answers: ProvidedAnswer[];
}

export interface ReportStats {
  total: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  missing: number;
  firstCorrect: number;
  firstIncorrect: number;
  firstKnown: number;
  answers: number;
  incorrect: number;
  hintedCompleted: number;
  completedAfterRetry: number;
}
