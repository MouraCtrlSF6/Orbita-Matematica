import assert from 'node:assert/strict';

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
  const url = new URL(`http://127.0.0.1:19000/${path}.json`);
  url.searchParams.set('ns', 'demo-orbita-default-rtdb');
  if (user) url.searchParams.set('auth', user.idToken);
  const response = await fetch(url, { method, body: JSON.stringify(body), headers });
  assert.equal(response.status, expected, `${method} ${path}: ${await response.clone().text()}`);
  return response.json();
}

const teacher = await identity();
const student = await identity();
const other = await identity();
const room = 'rooms/test-room';
const entry = `${room}/students/${student.localId}`;
const meta = { ownerUid: teacher.localId, open: true };
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

await request(`${room}/meta`, teacher, 'PUT', meta, 200);
await request(`${room}/meta/open`, student, 'GET', undefined, 200);
await request(entry, student, 'PUT', profile, 200, { 'If-Match': 'null_etag' });
await request(entry, student, 'PUT', profile, 412, { 'If-Match': 'null_etag' });
assert.equal((await request(entry, student, 'GET', undefined, 200)).name, profile.name);
await request(entry, student, 'PATCH', patch, 200);
await request(entry, student, 'PATCH', patch, 200);
await request(entry, student, 'PATCH', { name: 1 }, 401);
await request(entry, other, 'GET', undefined, 401);
await request(entry, other, 'PATCH', patch, 401);
await request(`${room}/students`, student, 'GET', undefined, 401);
await request(`${room}/students`, null, 'GET', undefined, 401);
await request(`${room}/students`, teacher, 'GET', undefined, 200);
await request(`${room}/meta/open`, student, 'PUT', false, 401);
await request(room, student, 'DELETE', undefined, 401);
await request(room, teacher, 'DELETE', undefined, 200);
await request(entry, student, 'PATCH', patch, 401);
await request(entry, student, 'PUT', profile, 401);
assert.equal(await request(`${room}/meta/open`, student, 'GET', undefined, 200), null);
console.log('Regras de entrada, leitura, atualização e exclusão verificadas.');
