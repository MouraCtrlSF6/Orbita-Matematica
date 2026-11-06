import {
  isFiniteNumber,
  isRecord,
  isText,
  matchesFields,
  optional,
  type Validator,
} from '../../game/validation';
import type { RoomSector, RoomStudent } from '../../game/room-progress';

const isStatus = (value: unknown) =>
  value === 'not_started' || value === 'in_progress' || value === 'completed';
const isBoolean = (value: unknown) => typeof value === 'boolean';
const isOrdinal = (value: unknown) => isFiniteNumber(value) && Number.isInteger(value) && value > 0;
const fields = (validators: Record<string, Validator>) => (value: unknown) =>
  isRecord(value) && matchesFields(value, validators);
const records = (validate: Validator) => (value: unknown) =>
  isRecord(value) && Object.values(value).every(validate);

const isAttempt = fields({
  order: isOrdinal,
  answer: fields({ label: isText, value: isText }),
  correct: isBoolean,
  context: optional(isText),
  variable: optional(isFiniteNumber),
});
const isMission = fields({
  missionNumber: isOrdinal,
  missionTitle: optional(isText),
  missionStatus: isStatus,
  usedHints: isBoolean,
  usedVisuals: isBoolean,
  providedAnswers: optional(records(isAttempt)),
});
const isSector = fields({
  sectorName: isText,
  sectorStatus: isStatus,
  missions: optional(records(isMission)),
});
const validateStudent = fields({
  studentId: isText,
  name: isText,
  currentSector: optional(isText),
  sectors: records(isSector),
});

interface StoredRoomStudent extends Omit<RoomStudent, 'sectors'> {
  sectors: Record<string, Omit<RoomSector, 'missions'> & { missions?: RoomSector['missions'] }>;
}

function isStoredRoomStudent(value: unknown): value is StoredRoomStudent {
  return validateStudent(value);
}

export function readRoomStudent(value: unknown): RoomStudent | null {
  if (!isStoredRoomStudent(value)) return null;
  return {
    ...value,
    sectors: Object.fromEntries(
      Object.entries(value.sectors).map(([id, sector]) => [
        id,
        { ...sector, missions: sector.missions ?? {} },
      ]),
    ),
  };
}

export function readRoomStudents(value: unknown): RoomStudent[] {
  return isRecord(value)
    ? Object.values(value)
        .map(readRoomStudent)
        .filter((student) => student !== null)
    : [];
}
