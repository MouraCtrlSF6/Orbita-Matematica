import { test as base, type Page } from '@playwright/test';

const roomId = 'b12ae140-fc6a-4690-ab61-5bfbb91a8d19';

export async function mockRoomBackend(page: Page) {
  await page.route('**/src/infrastructure/firebase/firebase-app.ts*', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: `
        export function initializeFirebaseAnalytics() {}
        export async function logFirebaseEvent(name, parameters) {
          const events = JSON.parse(sessionStorage.getItem('mock-analytics-events') ?? '[]');
          sessionStorage.setItem('mock-analytics-events', JSON.stringify([...events, { name, parameters }]));
        }
      `,
    }),
  );

  await page.route('**/src/infrastructure/firebase/room-catalog.ts*', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: `
      import { defaultRoomCatalog } from '/src/game/room-catalog.ts';
      export async function loadRoomCatalog(id) {
        await window.recordCatalogLoad?.(id);
        if (localStorage.getItem('mock-catalog-read-error')) throw new Error('Falha ao carregar questões.');
        const saved = localStorage.getItem('mock-catalog-' + id);
        return { catalog: saved ? JSON.parse(saved) : defaultRoomCatalog(), etag: 'test-etag' };
      }
      export async function saveRoomCatalog(id, snapshot, catalog) {
        if (localStorage.getItem('mock-catalog-write-error')) throw new Error('Falha ao salvar questões.');
        localStorage.setItem('mock-catalog-' + id, JSON.stringify(catalog));
        return { catalog, etag: 'test-etag' };
      }
    `,
    }),
  );

  await page.route('**/src/infrastructure/firebase/rooms.ts*', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: `
            import { initialRoomStudent } from '/src/game/room-progress.ts';
            const studentId = crypto.randomUUID();
            export class RoomError extends Error {}
            export async function findRoomByName(name) {
              return name === 'turma teste' ? (localStorage.getItem('mock-room-id') ?? ${JSON.stringify(roomId)}) : null;
            }
            export async function createRoom(id, name) {
              if (name === 'sala ocupada') throw new RoomError('Já existe uma sala com esse nome.');
              localStorage.setItem('mock-room-id', id);
            }
            export async function removeStudent() {
              if (localStorage.getItem('mock-student-delete-error')) throw new Error('Delete failed');
              window.dispatchEvent(new CustomEvent('mock-room-update', { detail: [] }));
            }
            export async function registerStudent(id, name, save, signal, catalog) {
              const student = initialRoomStudent(studentId, name, save, catalog);
              await window.recordStudentRegistration?.(student);
              return student;
            }
            export async function updateStudent(id, uid, patch) {
              await window.recordRoomPatch?.(patch);
            }
            export async function deleteRoom() {
              if (localStorage.getItem('mock-room-delete-error')) throw new Error('Delete failed');
            }
            export async function watchRoom(id, signal, onUpdate) {
              signal.throwIfAborted();
              onUpdate([]);
              window.addEventListener('mock-room-update', (event) => onUpdate(event.detail), { signal });
            }
          `,
    }),
  );
}

export const test = base.extend<{ mockRooms: void }>({
  mockRooms: [
    async ({ page }, use) => {
      await mockRoomBackend(page);
      await use();
    },
    { auto: true },
  ],
});

export async function enterRoom(page: Page, { name = 'Aluno de teste', resume = true } = {}) {
  await page.getByLabel('Nome da sala').fill('Turma Têste');
  await page.getByLabel('Nome completo').fill(name);
  if (resume) await page.getByRole('checkbox', { name: /Continuar meu progresso/ }).check();
  await page.getByRole('button', { name: 'Entrar na sala' }).click();
}
