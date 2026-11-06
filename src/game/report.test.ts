import { expect, it } from 'vitest';
import { missions } from '../content/missions';
import { initialSave } from './progress';
import { initialRoomStudent } from './room-progress';
import { reportRecords } from './report-records';
import { firstAnswer, hintsLabel, percentage, recordStatus, reportStats } from './report-stats';
import { errorExtremes, extremeLabels } from './report-comparisons';
import type { ReportSnapshot } from './report-types';

function fixture() {
  const student = initialRoomStudent('one', 'Ana', initialSave(), missions.slice(0, 2));
  const snapshot: ReportSnapshot = {
    roomId: 'room',
    roomName: 'Turma',
    generatedAt: '2026-11-06T17:30:00Z',
    catalog: { revision: 2, missions: missions.slice(0, 2) },
    students: [student],
  };
  const mission = student.sectors.launch.missions[missions[0].id];

  mission.missionStatus = 'completed';
  mission.usedHints = true;
  mission.providedAnswers = {
    second: { order: 2, answer: { label: 'Resposta', value: '5' }, correct: true },
    first: { order: 1, answer: { label: 'Resposta', value: '4' }, correct: false },
    third: { order: 3, answer: { label: 'Resposta', value: '4' }, correct: false },
  };
  return snapshot;
}

it('separates first-attempt accuracy from later completion and counts every incorrect answer', () => {
  const records = reportRecords(fixture());
  const stats = reportStats(records);

  expect(stats).toMatchObject({
    firstCorrect: 0,
    firstIncorrect: 1,
    firstKnown: 1,
    incorrect: 2,
    answers: 3,
    completed: 1,
    completedAfterRetry: 1,
    hintedCompleted: 1,
  });
  expect(records[0].answers.map((answer) => answer.order)).toEqual([1, 2, 3]);
  expect(recordStatus(records[0])).toBe('Concluída após novas tentativas');
  expect(hintsLabel(records[0])).toBe('Sim');
  expect(hintsLabel(records[1])).toBe('Não');
  expect(percentage(1, 3)).toBe('33,3%');
});

it('does not rewrite initial success after a later incorrect answer', () => {
  const record = reportRecords(fixture())[0];
  record.answers[0].correct = true;
  expect(reportStats([record])).toMatchObject({
    firstCorrect: 1,
    firstIncorrect: 0,
    completedAfterRetry: 0,
  });
});

it('does not invent initial attempts for imported conclusions or missing records', () => {
  const records = reportRecords(fixture());
  records[0].answers = [];
  expect(recordStatus(records[0])).toBe('Concluída sem histórico da primeira tentativa');
  expect(reportStats(records).firstKnown).toBe(0);
  records[0].answers = [{ order: 2, answer: { label: 'Resposta', value: '5' }, correct: true }];
  expect(firstAnswer(records[0])).toBeUndefined();
  expect(percentage(0, 0)).toBe('0');
});

it('separates historical questions and missing catalog entries without confusing homonyms', () => {
  const snapshot = fixture();
  snapshot.catalog.missions = [missions[1], missions[2]];
  snapshot.students.push(initialRoomStudent('two', 'Ana', initialSave(), []));
  const records = reportRecords(snapshot);

  expect(records.filter((record) => record.historical)).toHaveLength(1);
  expect(records.filter((record) => record.status === 'missing')).toHaveLength(3);
  expect(hintsLabel(records.find((record) => record.status === 'missing')!)).toBe('Sem registro');
  expect(new Set(records.map((record) => record.studentId)).size).toBe(2);
});

it('includes ties and excludes unanswered questions from error comparisons', () => {
  const records = reportRecords(fixture());
  const another = { ...records[0], missionId: 'other', title: 'Outra' };

  expect(extremeLabels([...records, another], false)).toContain('Outra');
  expect(errorExtremes([...records, another], false)).toContain('Outra');
  expect(errorExtremes([records[1]], true)).toBe('0');
  expect(reportRecords({ ...fixture(), students: [] })).toEqual([]);
});
