import { expect, type Page } from '@playwright/test';
import { enterRoom, mockRoomBackend, test } from './rooms-fixture';
import AxeBuilder from '@axe-core/playwright';
import { missions } from '../src/content/missions';
import { sectors } from '../src/content/sectors';

async function seed(page: Page, completedCount = 0) {
  await page.addInitScript(
    ({ ids, next }) =>
      sessionStorage.setItem(
        'orbita-matematica:v1:room:b12ae140-fc6a-4690-ab61-5bfbb91a8d19',
        JSON.stringify({
          version: 1,
          completed: Object.fromEntries(
            ids.map((id) => [id, { hints: 0, visual: false, attempts: 1, guided: false }]),
          ),
          tutorialDone: true,
          lastMissionId: next,
          preferences: { largeText: false, reducedMotion: false },
        }),
      ),
    {
      ids: missions.slice(0, completedCount).map((item) => item.id),
      next: missions[completedCount]?.id ?? null,
    },
  );
}

async function position(page: Page) {
  return page.locator('.player-ship').evaluate((element) => {
    const matrix = new DOMMatrix(getComputedStyle(element).transform);
    return { x: matrix.m41, y: matrix.m42 };
  });
}

async function flyToX(page: Page, x: number) {
  const start = await position(page);
  await page.getByRole('region', { name: 'Área de pilotagem' }).focus();
  await page.keyboard.down(x > start.x ? 'ArrowRight' : 'ArrowLeft');
  await expect
    .poll(
      async () =>
        x > start.x ? (await position(page)).x >= x - 10 : (await position(page)).x <= x + 10,
      { intervals: [16] },
    )
    .toBe(true);
  await page.keyboard.up(x > start.x ? 'ArrowRight' : 'ArrowLeft');
}

test('pilots between destinations, requires confirmation, preserves position and releases the next mission', async ({
  page,
}) => {
  await seed(page);
  await page.goto('/students');
  await enterRoom(page);
  await page.getByRole('region', { name: 'Área de pilotagem' }).focus();
  await expect(page.getByRole('button', { name: 'Entrar', exact: true })).toBeEnabled();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: sectors[0].name, exact: true })).toBeVisible();
  await expect(page.getByRole('region', { name: 'Área de pilotagem' })).toBeFocused();
  await flyToX(page, 440);
  await expect(page.getByRole('button', { name: 'Entrar', exact: true })).toBeDisabled();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: sectors[0].name, exact: true })).toBeVisible();
  await flyToX(page, 610);
  await expect(page.locator('.flight-contact')).toContainText('Conclua as missões anteriores');
  await expect(page.getByRole('button', { name: 'Entrar', exact: true })).toBeDisabled();
  await flyToX(page, 260);
  const landed = await position(page);
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: missions[0].title, exact: true })).toBeVisible();
  await page.getByRole('radio', { name: '5', exact: true }).check();
  await page.getByRole('button', { name: 'Conferir resposta' }).click();
  await page.getByRole('button', { name: 'Continuar exploração' }).click();
  await expect(page.getByRole('region', { name: 'Área de pilotagem' })).toBeFocused();
  expect((await position(page)).x).toBeCloseTo(landed.x, 0);
  await expect(page.locator(`[data-destination="${missions[0].id}"]`)).toHaveClass(/complete/);
  await expect(page.locator(`[data-destination="${missions[1].id}"]`)).toHaveClass(/next/);
  await flyToX(page, 610);
  const secondLanding = await position(page);
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: missions[1].title, exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Voltar ao setor', exact: true }).click();
  expect((await position(page)).x).toBeCloseTo(secondLanding.x, 0);
});

test('stops on release, blur, hidden tab and settings, and moves the camera and radar', async ({
  page,
}) => {
  await seed(page);
  await page.goto('/students');
  await enterRoom(page);
  await page.getByRole('button', { name: 'Retomar exploração' }).click();
  const pilot = page.getByRole('region', { name: 'Área de pilotagem' });
  await pilot.focus();
  await page.keyboard.down('d');
  await expect.poll(async () => (await position(page)).x).toBeGreaterThan(500);
  await page.keyboard.up('d');
  const stopped = await position(page);
  await page.waitForTimeout(150);
  expect(await position(page)).toEqual(stopped);
  await page.keyboard.down('ArrowRight');
  await expect.poll(async () => (await position(page)).x).toBeGreaterThan(stopped.x + 40);
  await page.keyboard.press('Tab');
  await page.keyboard.up('ArrowRight');
  const blurred = await position(page);
  await page.waitForTimeout(120);
  expect(await position(page)).toEqual(blurred);
  await pilot.focus();
  await page.keyboard.down('s');
  await expect.poll(async () => (await position(page)).y).toBeGreaterThan(700);
  await page.getByRole('button', { name: 'Ajustes da expedição' }).click();
  const paused = await position(page);
  await page.keyboard.up('s');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(120);
  expect(await position(page)).toEqual(paused);
  expect(
    await page
      .locator('.flight-scene')
      .evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m42),
  ).toBeLessThan(0);
  expect(Number(await page.locator('.radar-ship').getAttribute('cy'))).toBeCloseTo(paused.y);
  await pilot.focus();
  await page.keyboard.down('ArrowDown');
  await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
  await page.keyboard.up('ArrowDown');
  const hidden = await position(page);
  await page.waitForTimeout(120);
  expect(await position(page)).toEqual(hidden);
  await page.getByRole('button', { name: /Minhas descobertas/ }).click();
  await page.getByRole('button', { name: 'Voltar ao mapa', exact: true }).click();
  await page.getByRole('button', { name: 'Retomar exploração' }).click();
  expect(await position(page)).toEqual(hidden);
  await page.getByRole('button', { name: 'Como pilotar e jogar' }).click();
  await page.getByRole('button', { name: 'Voltar ao mapa' }).click();
  await page.getByRole('button', { name: 'Retomar exploração' }).click();
  expect(await position(page)).toEqual(hidden);
  await page.getByRole('button', { name: 'Ajustes da expedição' }).click();
  await page.getByRole('button', { name: 'Reiniciar expedição' }).click();
  await page.getByRole('button', { name: 'Sim, apagar progresso' }).click();
  await expect.poll(async () => (await position(page)).x).toBe(260);
  expect((await position(page)).y).toBe(390);
  await expect(page.getByRole('button', { name: 'Vamos explorar' })).toBeVisible();
});

test('restores an existing save near the pending mission and exposes every destination accessibly', async ({
  page,
}) => {
  const count = missions.filter((item) => item.sectorId === sectors[0].id).length;
  await seed(page, count);
  await page.goto('/students');
  await enterRoom(page);
  await expect(page.getByRole('heading', { name: 'O universo espera por você.' })).toBeVisible();
  await page.locator('.flight-destinations summary').click();
  const buttons = page.locator('.flight-destinations button');
  await expect(buttons).toHaveCount(sectors.length);
  await expect(buttons.nth(0)).toBeEnabled();
  await expect(buttons.nth(1)).toBeEnabled();
  await expect(buttons.nth(2)).toBeDisabled();
  await page.getByRole('button', { name: 'Retomar exploração' }).click();
  await expect(page.getByRole('heading', { name: sectors[1].name, exact: true })).toBeVisible();
  await expect(page.locator('.flight-contact')).toContainText(missions[count].title);
  await page.locator('.flight-destinations summary').click();
  await expect(page.locator('.flight-destinations button')).toHaveCount(
    missions.filter((item) => item.sectorId === sectors[1].id).length,
  );
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('supports a real touch hold on a small screen with enlarged text', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await mockRoomBackend(page);
  await seed(page);
  await page.goto('/students');
  await enterRoom(page);
  await page.getByRole('button', { name: 'Retomar exploração' }).click();
  await page.getByRole('button', { name: 'Ajustes da expedição' }).click();
  await page.getByRole('checkbox', { name: /Texto maior/ }).check();
  await page.getByRole('checkbox', { name: /Reduzir movimentos/ }).check();
  await page.getByRole('button', { name: 'Fechar ajustes' }).click();
  const button = page.getByRole('button', { name: 'Mover para a direita', exact: true });
  await button.scrollIntoViewIfNeeded();
  const box = (await button.boundingBox())!;
  const start = await position(page);
  const cdp = await context.newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: box.x + box.width / 2, y: box.y + box.height / 2 }],
  });
  await expect.poll(async () => (await position(page)).x).toBeGreaterThan(start.x + 50);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const stopped = await position(page);
  await page.waitForTimeout(120);
  expect(await position(page)).toEqual(stopped);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator('.flight')).toHaveClass(/flight-reduced/);
  await context.close();
});

test('allows completing the pilot practice with the keyboard', async ({ page }) => {
  await page.goto('/students');
  await enterRoom(page);
  await page.getByRole('button', { name: 'Vamos explorar' }).click();
  const pilot = page.getByRole('region', { name: 'Área de pilotagem' });
  await pilot.focus();
  await page.keyboard.down('ArrowUp');
  await expect(page.getByRole('button', { name: 'Entrar', exact: true })).toBeEnabled();
  await page.keyboard.up('ArrowUp');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Oi! Eu sou a Luma.' })).toBeVisible();
  await expect(page.locator('.tutorial-card')).toBeFocused();
});
