import { afterEach, expect, it, vi } from 'vitest';
import { initialSave } from '../../game/progress';
import { missions } from '../../content/missions';
import { initialRoomStudent } from '../../game/room-progress';
import { RoomError, updateStudent } from '../../infrastructure/firebase/rooms';
import { StudentRoom } from './room-sync';

vi.mock('../../infrastructure/firebase/rooms', async (original) => ({
  ...(await original<typeof import('../../infrastructure/firebase/rooms')>()),
  updateStudent: vi.fn(),
}));

afterEach(() => vi.useRealTimers());

const mission = missions[0];
const path = `sectors/${mission.sectorId}/missions/${mission.id}`;
const submit = (correct: boolean) => ({
  type: 'answer' as const,
  attempt: { answer: { label: 'Resposta', value: '3' }, correct },
});

it('imports saved completions and supports without inventing answers', () => {
  const save = initialSave();
  save.completed[mission.id] = { hints: 1, visual: true, attempts: 3, guided: false };
  const student = initialRoomStudent('student', 'Aluno de teste', save);
  const record = student.sectors[mission.sectorId].missions[mission.id];
  expect(record).toEqual({
    missionNumber: 1,
    missionStatus: 'completed',
    usedHints: true,
    usedVisuals: true,
  });
});

it('retries the same record, keeps its order and preserves completion after a restart', async () => {
  vi.useFakeTimers();
  const send = vi.mocked(updateStudent);
  send.mockRejectedValueOnce(new TypeError('offline')).mockResolvedValue(undefined);
  const room = new StudentRoom(
    'room',
    initialRoomStudent('student', 'Aluno de teste', initialSave()),
  );
  room.record(mission.sectorId, mission.id, submit(true));
  room.visitSector(mission.sectorId);
  room.visitSector(null);
  room.openMission(mission.sectorId, mission.id);
  room.record(mission.sectorId, mission.id, submit(false));

  await vi.advanceTimersByTimeAsync(0);
  expect(room.writes.getStatus()).toBe('retrying');
  expect(send).toHaveBeenCalledTimes(1);
  await vi.advanceTimersByTimeAsync(1000);
  expect(room.writes.getStatus()).toBe('synced');
  const patches = send.mock.calls.map(([, , patch]) => patch);
  expect(patches[0]).toEqual(patches[1]);
  expect(patches[1][`${path}/providedAnswers/attempt-1`]).toMatchObject({
    order: 1,
    correct: true,
  });
  expect(patches.at(-1)).toMatchObject({
    [`${path}/missionStatus`]: 'completed',
    [`${path}/providedAnswers/attempt-2`]: { order: 2, correct: false },
  });
});

it('stops the queue when the database rejects writes after room deletion', async () => {
  const send = vi.mocked(updateStudent);
  send.mockRejectedValue(new RoomError('Sala indisponível', 401));
  const room = new StudentRoom(
    'room',
    initialRoomStudent('student', 'Aluno de teste', initialSave()),
  );
  room.record(mission.sectorId, mission.id, submit(false));
  await vi.waitFor(() => expect(room.writes.getStatus()).toBe('stopped'));
  room.record(mission.sectorId, mission.id, submit(true));
  expect(send).toHaveBeenCalledTimes(1);
});
