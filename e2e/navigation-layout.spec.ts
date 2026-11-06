import { expect, type Page } from '@playwright/test';
import { enterRoom, test } from './rooms-fixture';

async function expectNavigationFits(page: Page) {
  const result = await page.locator('.sidebar').evaluate((sidebar) => {
    const bounds = sidebar.getBoundingClientRect();
    const style = getComputedStyle(sidebar);
    const left = bounds.left + parseFloat(style.paddingLeft);
    const right = bounds.right - parseFloat(style.paddingRight);

    return [...sidebar.querySelectorAll('nav button')].map((button) => {
      const rect = button.getBoundingClientRect();

      return {
        contained: rect.left >= left - 0.5 && rect.right <= right + 0.5,
        textFits: button.scrollWidth <= button.clientWidth,
      };
    });
  });

  expect(result).toHaveLength(2);
  for (const item of result) expect(item).toEqual({ contained: true, textFits: true });
}

async function expectListMarkersFit(page: Page) {
  const list = page.locator('.flight-destinations');

  await list.getByText('Destinos em lista', { exact: true }).click();
  const results = await list.locator('li').evaluateAll((items) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;

    return items.map((item, index) => {
      const style = getComputedStyle(item);

      context.font = style.font;
      return parseFloat(style.marginLeft) >= context.measureText(`${index + 1}. `).width;
    });
  });

  expect(results.length).toBeGreaterThan(0);
  expect(results.every(Boolean)).toBe(true);
  const buttons = await list.locator('button').evaluateAll((elements) =>
    elements.map((element) => {
      const rect = element.getBoundingClientRect();

      return { left: rect.left, right: rect.right, top: rect.top };
    }),
  );

  for (let index = 1; index < buttons.length; index++) {
    if (Math.abs(buttons[index].top - buttons[index - 1].top) < 1) {
      expect(buttons[index].left - buttons[index - 1].right).toBeGreaterThanOrEqual(30);
    }
  }
}

for (const largeText of [false, true]) {
  test(`keeps navigation and destination markers contained with largeText=${largeText}`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(90000);
    await page.addInitScript((enlarged) => {
      sessionStorage.setItem(
        'orbita-matematica:v1:room:b12ae140-fc6a-4690-ab61-5bfbb91a8d19',
        JSON.stringify({
          version: 1,
          completed: {},
          tutorialDone: true,
          lastMissionId: null,
          preferences: { largeText: enlarged, reducedMotion: true, soundEnabled: false },
        }),
      );
    }, largeText);

    for (const width of [1860, 1440, 1000, 390]) {
      for (const scale of [100, 125]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto('/students');
        await page.addStyleTag({ content: `html { font-size: ${scale}%; }` });
        await enterRoom(page);
        await page.evaluate(() => document.fonts.ready);
        await expectNavigationFits(page);
        await expectListMarkersFit(page);
        if (!largeText && width === 1860 && scale === 100) {
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.screenshot({ path: testInfo.outputPath('universe.png'), fullPage: true });
        }
        await page.locator('.flight-destinations button').first().click();
        await expectListMarkersFit(page);
        await expect(page.locator('.flight-destinations li')).toHaveCount(22);
        await page.locator('.flight-destinations button').first().click();
        await expectNavigationFits(page);
        if (!largeText && width === 1860 && scale === 100) {
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.screenshot({ path: testInfo.outputPath('mission.png'), fullPage: true });
        }
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
      }
    }
  });
}
