import assert from 'node:assert/strict';

const authHost = process.env.FIREBASE_AUTH_EMULATOR_HOST ?? '127.0.0.1:9099';
assert.match(authHost, /^127\.0\.0\.1:\d+$/);

const databaseHost = process.env.FIREBASE_DATABASE_EMULATOR_HOST ?? '127.0.0.1:19000';
assert.match(databaseHost, /^127\.0\.0\.1:\d+$/);

async function identity() {
  const response = await fetch(
    `http://${authHost}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-key`,
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
  missionTitle: 'Questão de teste',
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

const catalog = { revision: 0, sectors: { launch: '[]', workshop: '[]', base: '[]' } };
const create = { [`${room}/meta`]: meta, [indexPath]: roomId, [`${room}/catalog`]: catalog };
const duplicate = {
  [`rooms/${nextRoomId}/meta`]: { ...meta, ownerUid: other.localId },
  [indexPath]: nextRoomId,
};
await request(`${room}/meta`, teacher, 'PUT', meta, 401);
await request('', teacher, 'PATCH', create, 200);
await request('', teacher, 'PATCH', { [`${room}/meta`]: meta, [indexPath]: roomId }, 200);
await request('', other, 'PATCH', duplicate, 401);
await request(`${room}/catalog`, teacher, 'PUT', catalog, 401);
await request(`${room}/catalog`, student, 'GET', undefined, 200);
await request(`${room}/catalog`, null, 'GET', undefined, 401);
await request(`${room}/catalog`, student, 'PUT', { ...catalog, revision: 1 }, 401);
await request(`${room}/catalog`, other, 'PUT', { ...catalog, revision: 1 }, 401);
await request(`${room}/catalog`, null, 'PUT', { ...catalog, revision: 1 }, 401);
await request(`${room}/catalog`, teacher, 'PUT', catalog, 401);
await request(
  `${room}/catalog`,
  teacher,
  'PUT',
  { ...catalog, revision: 1, sectors: { ...catalog.sectors, extra: '[]' } },
  401,
);
await request(
  `${room}/catalog`,
  teacher,
  'PUT',
  { ...catalog, revision: 1, sectors: { launch: '[]' } },
  401,
);
await request(
  `${room}/catalog`,
  teacher,
  'PUT',
  { ...catalog, revision: 1, sectors: { ...catalog.sectors, base: [] } },
  401,
);
await request(`${room}/catalog`, teacher, 'PUT', { ...catalog, revision: 1 }, 200);
await request(`${room}/catalog`, teacher, 'DELETE', undefined, 401);

assert.equal(await request(indexPath, student, 'GET', undefined, 200), roomId);
await request(indexPath, null, 'GET', undefined, 401);
await request('roomNames', null, 'GET', undefined, 401);
await request('roomNames', student, 'GET', undefined, 401);
await request('roomNames', teacher, 'GET', undefined, 401);
assert.equal(await request(`${room}/meta/open`, teacher, 'GET', undefined, 200), true);
await request(`${room}/meta/open`, student, 'GET', undefined, 401);
await request(entry, student, 'PUT', profile, 200, { 'If-Match': 'null_etag' });
await request(entry, student, 'PUT', profile, 412, { 'If-Match': 'null_etag' });
assert.equal((await request(entry, student, 'GET', undefined, 200)).name, profile.name);
await request(entry, student, 'PATCH', patch, 200);
await request(entry, student, 'PATCH', patch, 200);
await request(entry, student, 'PATCH', { name: 1 }, 401);
await request(
  entry,
  student,
  'PATCH',
  { 'sectors/extra': { sectorName: 'Extra', sectorStatus: 'not_started' } },
  401,
);
await request(
  entry,
  student,
  'PATCH',
  { 'sectors/base': { sectorName: 'Base', sectorStatus: 'completed' } },
  200,
);
await request(entry, other, 'GET', undefined, 401);
await request(entry, null, 'GET', undefined, 401);
await request(entry, other, 'PATCH', patch, 401);
await request(entry, null, 'PATCH', patch, 401);
await request(`${room}/students`, student, 'GET', undefined, 401);
await request(`${room}/students`, null, 'GET', undefined, 401);
await request('', null, 'GET', undefined, 401);
await request('', teacher, 'GET', undefined, 401);
await request('rooms', teacher, 'GET', undefined, 401);
await request(room, other, 'GET', undefined, 401);
await request(room, student, 'GET', undefined, 401);
assert.equal((await request(room, teacher, 'GET', undefined, 200)).meta.ownerUid, teacher.localId);
assert.equal(
  (await request(`${room}/students`, teacher, 'GET', undefined, 200))[student.localId].name,
  profile.name,
);
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
await request(entry, student, 'GET', undefined, 401);
await request(`${room}/catalog`, student, 'GET', undefined, 401);
await request(entry, student, 'PATCH', patch, 401);
await request(entry, student, 'PUT', profile, 401);
await request('', teacher, 'PATCH', { [room]: null, [indexPath]: null }, 200);
assert.equal(await request(indexPath, student, 'GET', undefined, 200), null);
await request('', other, 'PATCH', duplicate, 200);
assert.equal(await request(indexPath, student, 'GET', undefined, 200), nextRoomId);
await request(`rooms/${nextRoomId}`, teacher, 'GET', undefined, 401);
assert.equal(await request(`rooms/${nextRoomId}/catalog`, student, 'GET', undefined, 200), null);
await request(entry, student, 'PATCH', patch, 401);
await request(entry, student, 'PUT', profile, 401);
assert.equal(await request(`${room}/meta/open`, teacher, 'GET', undefined, 200), null);
await request(`${room}/meta/open`, null, 'GET', undefined, 401);
console.log('Regras de entrada, leitura, atualização e exclusão verificadas.');
