import { expect, test, type Page } from '@playwright/test';
import type { RoomStudent } from '../src/game/room-progress';
import { enterRoom } from './rooms-fixture';

const roomId = '11111111-1111-4111-8111-111111111111';

async function mockIdentityBackend(page: Page) {
  const students = new Map<string, RoomStudent>();
  let signIns = 0;
  let removed = false;
  await page.route('**/src/infrastructure/firebase/firebase-app.ts*', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: `
        import { initializeApp } from '/node_modules/.vite/deps/firebase_app.js';
        export function initializeFirebase() {
          return initializeApp({ apiKey: 'identity-test', projectId: 'demo-orbita',
            appId: 'identity-test', databaseURL: 'https://identity.example.test/' });
        }
        export function initializeFirebaseAnalytics() { initializeFirebase(); }
        export async function logFirebaseEvent() {}
      `,
    }),
  );
  await page.route('https://identitytoolkit.googleapis.com/**', async (route) => {
    if (route.request().url().includes('accounts:signUp')) {
      signIns += 1;
      await route.fulfill({
        json: {
          localId: `student-${signIns}`,
          idToken: 'test-token',
          refreshToken: 'test-refresh',
          expiresIn: '3600',
        },
      });
    } else {
      await route.fulfill({ json: { users: [{ localId: `student-${signIns}` }] } });
    }
  });
  await page.route('https://identity.example.test/**', async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    if (path.startsWith('/roomNames/')) return route.fulfill({ json: roomId });
    if (path.endsWith('/catalog.json')) return route.fulfill({ json: null });
    if (removed) return route.fulfill({ status: 401, json: { error: 'Permission denied' } });
    const key = path;
    if (request.method() === 'PUT') {
      if (students.has(key)) return route.fulfill({ status: 412, json: students.get(key) });
      students.set(key, request.postDataJSON());
    }
    if (request.method() === 'PATCH') {
      const student = students.get(key)!;
      for (const [field, value] of Object.entries(request.postDataJSON())) {
        const segments = field.split('/');
        let target = student as unknown as Record<string, unknown>;
        for (const segment of segments.slice(0, -1)) {
          target[segment] ??= {};
          target = target[segment] as Record<string, unknown>;
        }
        target[segments.at(-1)!] = value;
      }
    }
    return route.fulfill({ json: students.get(key) ?? null });
  });
  return { students, signIns: () => signIns, remove: () => (removed = true) };
}

async function recordAttempt(page: Page, id = roomId) {
  await page.evaluate(async (room) => {
    const roomsModule = '/src/infrastructure/firebase/rooms.ts';
    const progressModule = '/src/game/progress.ts';
    const syncModule = '/src/pages/students/room-sync.ts';
    const { registerStudent } = await import(/* @vite-ignore */ roomsModule);
    const { initialSave } = await import(/* @vite-ignore */ progressModule);
    const { StudentRoom } = await import(/* @vite-ignore */ syncModule);
    const student = await registerStudent(
      room,
      'Aluno de teste',
      initialSave(),
      new AbortController().signal,
    );
    const session = new StudentRoom(room, student);
    session.record('launch', 'launch-1', {
      type: 'answer',
      attempt: { answer: { label: 'Teste', value: '1' }, correct: false },
    });
    await new Promise<void>((resolve) => {
      const unsubscribe = session.writes.subscribe(() => {
        if (session.writes.getStatus() === 'synced') {
          unsubscribe();
          resolve();
        }
      });
    });
  }, id);
}

test('restores the real Firebase SDK identity after reload without duplicating students or attempts', async ({
  page,
}) => {
  const backend = await mockIdentityBackend(page);
  await page.goto('/students');
  await enterRoom(page, { resume: false });
  await expect(page.getByRole('button', { name: 'Entrar na sala' })).toHaveCount(0);
  await recordAttempt(page);
  for (let index = 0; index < 3; index += 1) {
    await page.reload();
    await expect(page.getByRole('button', { name: 'Entrar na sala' })).toBeVisible();
    await expect(page.getByRole('checkbox', { name: /Continuar meu progresso/ })).not.toBeChecked();
    await enterRoom(page, { resume: false });
    await expect(page.getByRole('button', { name: 'Entrar na sala' })).toHaveCount(0);
  }
  await recordAttempt(page);
  expect(backend.signIns()).toBe(1);
  expect(backend.students.size).toBe(1);
  const student = [...backend.students.values()][0];
  expect(student.sectors.launch.missions['launch-1'].providedAnswers).toMatchObject({
    'attempt-1': { order: 1, correct: false },
    'attempt-2': { order: 2, correct: false },
  });
  await recordAttempt(page, '22222222-2222-4222-8222-222222222222');
  expect(backend.students.size).toBe(2);
  const other = [...backend.students.values()][1];
  expect(other.studentId).toBe(student.studentId);
  expect(Object.keys(other.sectors.launch.missions['launch-1'].providedAnswers!)).toEqual([
    'attempt-1',
  ]);
  backend.remove();
  await page.reload();
  await enterRoom(page, { resume: false });
  await expect(page.getByRole('alert')).toContainText('O Firebase recusou a operação');
  expect(backend.signIns()).toBe(1);
  expect(backend.students.size).toBe(2);
});

test('falls back to memory when session storage is blocked', async ({ page }) => {
  const backend = await mockIdentityBackend(page);
  await page.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', {
      get() {
        throw new DOMException('Storage blocked', 'SecurityError');
      },
    });
  });
  await page.goto('/students');
  await enterRoom(page, { resume: false });
  await expect(page.getByRole('button', { name: 'Entrar na sala' })).toHaveCount(0);
  await recordAttempt(page);
  expect(backend.signIns()).toBe(1);
  expect(backend.students.size).toBe(1);
});
