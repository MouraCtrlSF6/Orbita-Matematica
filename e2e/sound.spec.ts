import { expect, type Page } from '@playwright/test';
import { enterRoom, test } from './rooms-fixture';
import { missions } from '../src/content/missions';

test('M toggles sound once per press and stays synchronized with settings', async ({ page }) => {
  await page.goto('/students');
  await enterRoom(page);
  const toggle = page.getByRole('button', { name: 'Som da nave', exact: true });
  await page.getByRole('region', { name: 'Área de pilotagem' }).focus();
  await page.keyboard.down('m');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.down('m');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await page.keyboard.up('m');
  await page.keyboard.press('Shift+m');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  for (const modifier of ['ctrlKey', 'altKey', 'metaKey']) {
    await page
      .locator('body')
      .dispatchEvent('keydown', { key: 'm', [modifier]: true, bubbles: true });
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  }
  await page.keyboard.press('m');
  await page.reload();
  await enterRoom(page);
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await page.getByRole('button', { name: 'Ajustes da expedição' }).click();
  await expect(page.getByRole('checkbox', { name: /Som da nave/ })).not.toBeChecked();
  await page.getByRole('button', { name: 'Fechar ajustes' }).click();
  await toggle.focus();
  await page.keyboard.press('m');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
});

test('typing M in an answer does not mute the game', async ({ page }) => {
  await page.addInitScript(
    (ids) =>
      sessionStorage.setItem(
        'orbita-matematica:v1:room:b12ae140-fc6a-4690-ab61-5bfbb91a8d19',
        JSON.stringify({
          version: 1,
          tutorialDone: true,
          lastMissionId: 'launch-2',
          completed: Object.fromEntries(
            ids.map((id) => [id, { hints: 0, visual: false, attempts: 1, guided: false }]),
          ),
          preferences: { largeText: false, reducedMotion: false, soundEnabled: true },
        }),
      ),
    missions
      .slice(
        0,
        missions.findIndex((item) => item.id === 'launch-2'),
      )
      .map((item) => item.id),
  );
  await page.goto('/students');
  await enterRoom(page);
  await page.getByRole('button', { name: 'Retomar exploração' }).click();
  await page.getByRole('button', { name: 'Entrar', exact: true }).click();
  const answer = page.getByRole('textbox', { name: 'Qual é o total?' });
  await answer.press('m');
  await expect(answer).toHaveValue('m');
  expect(
    await page.evaluate(
      () =>
        JSON.parse(
          sessionStorage.getItem('orbita-matematica:v1:room:b12ae140-fc6a-4690-ab61-5bfbb91a8d19')!,
        ).preferences.soundEnabled,
    ),
  ).toBe(true);
  await page.getByRole('button', { name: 'Quero uma pista' }).focus();
  await page.keyboard.press('m');
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          JSON.parse(
            sessionStorage.getItem(
              'orbita-matematica:v1:room:b12ae140-fc6a-4690-ab61-5bfbb91a8d19',
            )!,
          ).preferences.soundEnabled,
      ),
    )
    .toBe(false);
});

interface AudioProbe {
  contexts: AudioContext[];
  analysers: AnalyserNode[];
}

for (const width of [1440, 390]) {
  test(`keeps the sound toggle in the map corner and shares its saved preference at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.addInitScript(() => {
      if (!sessionStorage.getItem('orbita-matematica:v1:room:b12ae140-fc6a-4690-ab61-5bfbb91a8d19'))
        sessionStorage.setItem(
          'orbita-matematica:v1:room:b12ae140-fc6a-4690-ab61-5bfbb91a8d19',
          JSON.stringify({
            version: 1,
            completed: {},
            tutorialDone: true,
            lastMissionId: null,
            preferences: { largeText: false, reducedMotion: false },
          }),
        );
    });
    await page.goto('/students');
    await enterRoom(page);
    const toggle = page.getByRole('button', { name: 'Som da nave', exact: true });
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(toggle).toContainText('Som ligado');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await page.getByRole('button', { name: 'Ajustes da expedição' }).click();
    await expect(page.getByRole('checkbox', { name: /Som da nave/ })).not.toBeChecked();
    await page.getByRole('checkbox', { name: /Som da nave/ }).check();
    await page.getByRole('button', { name: 'Fechar ajustes' }).click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await toggle.focus();
    await page.keyboard.press('Space');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await page.reload();
    await enterRoom(page);
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await page.getByRole('button', { name: 'Retomar exploração' }).click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    const pilot = page.getByRole('region', { name: 'Área de pilotagem' });
    const corner = async () => {
      const map = (await pilot.boundingBox())!;
      const button = (await toggle.boundingBox())!;
      return {
        right: map.x + map.width - button.x - button.width,
        bottom: map.y + map.height - button.y - button.height,
      };
    };
    expect(await corner()).toEqual({ right: 14, bottom: 14 });
    await pilot.focus();
    await page.keyboard.down('ArrowDown');
    await expect
      .poll(() =>
        page
          .locator('.player-ship')
          .evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m42),
      )
      .toBeGreaterThan(700);
    await page.keyboard.up('ArrowDown');
    expect(await corner()).toEqual({ right: 14, bottom: 14 });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}

async function audioState(page: Page) {
  return page.evaluate(() => {
    const probe = (window as unknown as { audioProbe: AudioProbe }).audioProbe;
    const analyser = probe.analysers.at(-1);
    const samples = new Float32Array(256);
    analyser?.getFloatTimeDomainData(samples);
    return {
      count: probe.contexts.length,
      state: probe.contexts.at(-1)?.state,
      rms: Math.sqrt(samples.reduce((sum, sample) => sum + sample * sample, 0) / samples.length),
    };
  });
}

test('plays thrust only while moving, stops on interruption and persists mute', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const probe: AudioProbe = { contexts: [], analysers: [] };
    (window as unknown as { audioProbe: AudioProbe }).audioProbe = probe;
    window.AudioContext = class extends AudioContext {
      constructor() {
        super();
        probe.contexts.push(this);
      }
      createGain() {
        const gain = super.createGain();
        const analyser = this.createAnalyser();
        analyser.fftSize = 256;
        gain.connect(analyser);
        probe.analysers.push(analyser);
        return gain;
      }
    };
  });
  await page.goto('/students');
  await enterRoom(page);
  expect((await audioState(page)).count).toBe(0);
  const pilot = page.getByRole('region', { name: 'Área de pilotagem' });
  await pilot.focus();
  await page.keyboard.down('ArrowRight');
  await expect.poll(async () => (await audioState(page)).rms).toBeGreaterThan(0.001);
  await page.keyboard.press('m');
  await expect(page.getByRole('button', { name: 'Som da nave', exact: true })).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  await expect.poll(async () => (await audioState(page)).rms).toBeLessThan(0.00001);
  await page.keyboard.press('M');
  await expect.poll(async () => (await audioState(page)).rms).toBeGreaterThan(0.001);
  await page.keyboard.up('ArrowRight');
  await expect.poll(async () => (await audioState(page)).rms).toBeLessThan(0.00001);
  await page.keyboard.down('ArrowLeft');
  await expect.poll(async () => (await audioState(page)).rms).toBeGreaterThan(0.001);
  await page.keyboard.press('Tab');
  await page.keyboard.up('ArrowLeft');
  await expect.poll(async () => (await audioState(page)).rms).toBeLessThan(0.00001);
  await pilot.focus();
  await page.keyboard.down('ArrowRight');
  await expect.poll(async () => (await audioState(page)).rms).toBeGreaterThan(0.001);
  await page.getByRole('button', { name: 'Ajustes da expedição' }).click();
  await page.keyboard.up('ArrowRight');
  await expect.poll(async () => (await audioState(page)).rms).toBeLessThan(0.00001);
  await page.getByRole('checkbox', { name: /Som da nave/ }).uncheck();
  await page.getByRole('button', { name: 'Fechar ajustes' }).click();
  await pilot.focus();
  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(150);
  expect((await audioState(page)).rms).toBeLessThan(0.00001);
  await page.keyboard.up('ArrowRight');
  await page.reload();
  await enterRoom(page);
  await page.getByRole('button', { name: 'Ajustes da expedição' }).click();
  await expect(page.getByRole('checkbox', { name: /Som da nave/ })).not.toBeChecked();
  await page.getByRole('checkbox', { name: /Som da nave/ }).check();
  await page.getByRole('button', { name: 'Fechar ajustes' }).click();
  const button = page.getByRole('button', { name: 'Mover para a direita', exact: true });
  await button.hover();
  await page.mouse.down();
  await expect.poll(async () => (await audioState(page)).rms).toBeGreaterThan(0.001);
  await page.mouse.up();
  await expect.poll(async () => (await audioState(page)).rms).toBeLessThan(0.00001);
  await page.getByRole('button', { name: /Minhas descobertas/ }).click();
  await expect.poll(async () => (await audioState(page)).state).toBe('closed');
});

test('keeps flying without an audio API', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'AudioContext', { value: undefined });
  });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/students');
  await enterRoom(page);
  const ship = page.locator('.player-ship');
  const readX = () =>
    ship.evaluate((element) => new DOMMatrix(getComputedStyle(element).transform).m41);
  const start = await readX();
  await page.getByRole('region', { name: 'Área de pilotagem' }).focus();
  await page.keyboard.down('ArrowRight');
  await expect.poll(readX).toBeGreaterThan(start + 20);
  await page.keyboard.up('ArrowRight');
  expect(errors).toEqual([]);
});
