import { expect, it } from 'vitest';
import { readRoomStudent, readRoomStudents } from './room-records';

it('normalizes empty sector mission maps omitted by the Realtime Database', () => {
  const value = {
    studentId: 'uid',
    name: 'Aluno',
    sectors: { launch: { sectorName: 'Estação', sectorStatus: 'completed' } },
  };

  expect(readRoomStudent(value)?.sectors.launch.missions).toEqual({});
  expect(readRoomStudents({ uid: value })).toHaveLength(1);
  expect(readRoomStudent({ ...value, name: 123 })).toBeNull();
});
