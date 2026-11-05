import { expect, it } from 'vitest';
import { initialRoomStudent } from './room-progress';
import { mergeStudentMissions } from './merge-student-missions';
import { initialSave } from './progress';
import { missions } from '../content/missions';

it('adds new missions without changing historical answers or removed missions', () => {
  const existing = initialRoomStudent('uid', 'Aluno', initialSave());
  const id = missions[0].id;
  const attempt = { order: 1, answer: { label: '5', value: '5' }, correct: true };
  existing.sectors.launch.missions[id].providedAnswers = { 'attempt-1': attempt };
  const custom = { ...missions[0], id: 'custom-new' };
  const incoming = initialRoomStudent('uid', 'Aluno', initialSave(), [custom]);
  const { merged, patch } = mergeStudentMissions(existing, incoming);

  expect(merged.sectors.launch.missions[id].providedAnswers).toEqual({ 'attempt-1': attempt });
  expect(merged.sectors.launch.missions[custom.id]).toBeDefined();
  expect(patch[`sectors/launch/missions/${id}`]).toBeUndefined();
  expect(existing.sectors.launch.missions[custom.id]).toBeUndefined();
});
