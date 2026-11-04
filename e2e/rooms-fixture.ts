import { test as base, type Page } from '@playwright/test';

const roomId = 'b12ae140-fc6a-4690-ab61-5bfbb91a8d19';

export async function mockRoomBackend(page: Page) {
  await page.route('**/src/infrastructure/firebase/rooms.ts*', (route) =>
    route.fulfill({
      contentType: 'text/javascript',
      body: `
            export class RoomError extends Error {}
            export async function checkRoom(id) { return id === ${JSON.stringify(roomId)}; }
            export async function createRoom() {}
            export async function watchRoom(id, signal, onUpdate) {
              signal.throwIfAborted();
              onUpdate(0);
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

export async function enterRoom(page: Page) {
  await page.getByLabel('UID da sala').fill(roomId);
  await page.getByRole('button', { name: 'Entrar na sala' }).click();
}
