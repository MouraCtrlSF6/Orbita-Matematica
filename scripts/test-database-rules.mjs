import assert from 'node:assert/strict';

const databaseHost = process.env.FIREBASE_DATABASE_EMULATOR_HOST ?? '127.0.0.1:19000';
assert.match(databaseHost, /^127\.0\.0\.1:\d+$/);

async function identity() {
  const response = await fetch(
    'http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-key',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ returnSecureToken: true }),
    },
  );
  assert.equal(response.status, 200, await response.clone().text());
  return response.json();
}

async function request(path, user, method, body, expected, headers) {
  const url = new URL(`http://${databaseHost}/${path}.json`);
  url.searchParams.set('ns', 'demo-orbita-default-rtdb');
  if (user) url.searchParams.set('auth', user.idToken);
  const response = await fetch(url, { method, body: JSON.stringify(body), headers });
  assert.equal(response.status, expected, `${method} ${path}: ${await response.clone().text()}`);
  return response.json();
}

const teacher = await identity();
const student = await identity();
const other = await identity();
const roomId = '11111111-1111-4111-8111-111111111111';
const nextRoomId = '22222222-2222-4222-8222-222222222222';
const room = `rooms/${roomId}`;
const roomName = 'turma teste';
const indexPath = `roomNames/${roomName}`;
const entry = `${room}/students/${student.localId}`;
const meta = { ownerUid: teacher.localId, open: true, name: roomName };
const mission = {
  missionNumber: 1,
  missionStatus: 'not_started',
  usedHints: false,
  usedVisuals: false,
};
const profile = {
  studentId: student.localId,
  name: 'Aluno de teste',
  sectors: {
    launch: { sectorName: 'Estação', sectorStatus: 'not_started', missions: { first: mission } },
  },
};
const attempt = { order: 1, answer: { label: 'Alternativa A', value: '1' }, correct: false };
const patch = { 'sectors/launch/missions/first/providedAnswers/attempt-1': attempt };

const create = { [`${room}/meta`]: meta, [indexPath]: roomId };
const duplicate = {
  [`rooms/${nextRoomId}/meta`]: { ...meta, ownerUid: other.localId },
  [indexPath]: nextRoomId,
};
await request(`${room}/meta`, teacher, 'PUT', meta, 401);
await request('', teacher, 'PATCH', create, 200);
await request('', teacher, 'PATCH', create, 200);
await request('', other, 'PATCH', duplicate, 401);
assert.equal(await request(indexPath, student, 'GET', undefined, 200), roomId);
assert.equal((await request('roomNames', null, 'GET', undefined, 200))[roomName], roomId);
await request(`${room}/meta/open`, student, 'GET', undefined, 200);
await request(entry, student, 'PUT', profile, 200, { 'If-Match': 'null_etag' });
await request(entry, student, 'PUT', profile, 412, { 'If-Match': 'null_etag' });
assert.equal((await request(entry, student, 'GET', undefined, 200)).name, profile.name);
await request(entry, student, 'PATCH', patch, 200);
await request(entry, student, 'PATCH', patch, 200);
await request(entry, student, 'PATCH', { name: 1 }, 401);
assert.equal((await request(entry, other, 'GET', undefined, 200)).name, profile.name);
await request(entry, other, 'PATCH', patch, 401);
await request(entry, null, 'PATCH', patch, 401);
await request(`${room}/students`, student, 'GET', undefined, 200);
assert.equal(
  (await request(`${room}/students`, null, 'GET', undefined, 200))[student.localId].name,
  profile.name,
);
assert.equal(
  (await request('', null, 'GET', undefined, 200)).rooms[roomId].students[student.localId].name,
  profile.name,
);
await request(`${room}/students`, teacher, 'GET', undefined, 200);
await request(`${room}/meta/open`, student, 'PUT', false, 401);
await request(room, student, 'DELETE', undefined, 401);
await request(room, teacher, 'DELETE', undefined, 401);
await request(indexPath, teacher, 'DELETE', undefined, 401);
const removal = {
  [`students/${student.localId}`]: null,
  [`removedStudents/${student.localId}`]: true,
};
await request(entry, teacher, 'DELETE', undefined, 401);
await request(room, other, 'PATCH', removal, 401);
await request(room, teacher, 'PATCH', removal, 200);
assert.equal(await request(entry, teacher, 'GET', undefined, 200), null);
await request(entry, student, 'PATCH', patch, 401);
await request(entry, student, 'PUT', profile, 401);
await request('', teacher, 'PATCH', { [room]: null, [indexPath]: null }, 200);
assert.equal(await request(indexPath, student, 'GET', undefined, 200), null);
await request('', other, 'PATCH', duplicate, 200);
assert.equal(await request(indexPath, student, 'GET', undefined, 200), nextRoomId);
await request(entry, student, 'PATCH', patch, 401);
await request(entry, student, 'PUT', profile, 401);
assert.equal(await request(`${room}/meta/open`, student, 'GET', undefined, 200), null);
console.log('Regras de entrada, leitura, atualização e exclusão verificadas.');
