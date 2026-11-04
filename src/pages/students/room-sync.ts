import {
  sectorStatus,
  type MissionActivity,
  type ProvidedAnswer,
  type RoomStudent,
} from '../../game/room-progress';
import { RoomError, updateStudent, type StudentPatch } from '../../infrastructure/firebase/rooms';
import { createBrowserGameStorage } from '../../infrastructure/gameStorage';

type SyncStatus = 'synced' | 'pending' | 'retrying' | 'stopped';

function canRetry(error: unknown) {
  if (!(error instanceof RoomError) || !error.status) return true;
  return error.status >= 500 || error.status === 429;
}

function nextAttemptOrder(attempts: Record<string, ProvidedAnswer>) {
  return (
    Object.values(attempts).reduce((highest, attempt) => Math.max(highest, attempt.order), 0) + 1
  );
}

class StudentWrites {
  private pending: StudentPatch[] = [];
  private status: SyncStatus = 'synced';
  private delay = 1000;
  private listeners = new Set<() => void>();

  constructor(private send: (patch: StudentPatch) => Promise<void>) {}

  getStatus = () => this.status;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private setStatus(status: SyncStatus) {
    if (this.status === status) return;
    this.status = status;
    this.listeners.forEach((listener) => listener());
  }

  enqueue(patch: StudentPatch) {
    if (this.status === 'stopped') return;
    this.pending.push(patch);
    if (this.status === 'synced') void this.flush();
  }

  private async flush() {
    const patch = this.pending[0];
    if (!patch) return this.setStatus('synced');
    this.setStatus('pending');
    try {
      await this.send(patch);
      this.pending.shift();
      this.delay = 1000;
      void this.flush();
    } catch (error) {
      this.failed(error);
    }
  }

  private failed(error: unknown) {
    if (!canRetry(error)) return this.setStatus('stopped');
    this.setStatus('retrying');
    window.setTimeout(() => void this.flush(), this.delay);
    this.delay = Math.min(this.delay * 2, 30_000);
  }
}

export class StudentRoom {
  readonly writes: StudentWrites;

  constructor(
    readonly roomId: string,
    private student: RoomStudent,
    readonly storage = createBrowserGameStorage(roomId),
  ) {
    this.writes = new StudentWrites((patch) => updateStudent(roomId, student.studentId, patch));
  }

  visitSector(sectorId: string | null) {
    const sector = sectorId ? this.student.sectors[sectorId] : undefined;
    const name = sector?.sectorName;
    if (this.student.currentSector === name) return;
    this.student.currentSector = name;
    this.writes.enqueue({ currentSector: name ?? null });
    if (sectorId && sector?.sectorStatus === 'not_started') this.startSector(sectorId);
  }

  private startSector(sectorId: string) {
    this.student.sectors[sectorId].sectorStatus = 'in_progress';
    this.writes.enqueue({ [`sectors/${sectorId}/sectorStatus`]: 'in_progress' });
  }

  openMission(sectorId: string, missionId: string) {
    const mission = this.student.sectors[sectorId]?.missions[missionId];
    if (mission?.missionStatus !== 'not_started') return;
    mission.missionStatus = 'in_progress';
    this.writes.enqueue({
      [`sectors/${sectorId}/missions/${missionId}/missionStatus`]: 'in_progress',
    });
  }

  record = (sectorId: string, missionId: string, activity: MissionActivity) => {
    const mission = this.student.sectors[sectorId]?.missions[missionId];
    if (!mission) return;
    const path = `sectors/${sectorId}/missions/${missionId}`;
    if (activity.type === 'answer') this.recordAnswer(sectorId, missionId, activity);
    else this.useSupport(sectorId, missionId, path, activity.type);
  };

  private useSupport(sectorId: string, missionId: string, path: string, type: 'hint' | 'visual') {
    const mission = this.student.sectors[sectorId].missions[missionId];
    const field = type === 'hint' ? 'usedHints' : 'usedVisuals';
    if (mission[field]) return;
    mission[field] = true;
    this.writes.enqueue({ [`${path}/${field}`]: true });
  }

  private recordAnswer(
    sectorId: string,
    missionId: string,
    activity: Extract<MissionActivity, { type: 'answer' }>,
  ) {
    const sector = this.student.sectors[sectorId];
    const mission = sector.missions[missionId];
    const attempts = (mission.providedAnswers ??= {});
    const order = nextAttemptOrder(attempts);
    const key = `attempt-${order}`;
    const answer = { ...activity.attempt, order };
    attempts[key] = answer;
    const path = `sectors/${sectorId}/missions/${missionId}`;
    if (answer.correct) mission.missionStatus = 'completed';
    sector.sectorStatus = sectorStatus(sector.missions);
    this.writes.enqueue({
      [`${path}/providedAnswers/${key}`]: answer,
      [`${path}/missionStatus`]: mission.missionStatus,
      [`sectors/${sectorId}/sectorStatus`]: sector.sectorStatus,
    });
  }
}
