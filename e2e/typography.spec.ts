import { expect } from '@playwright/test';
import { enterRoom, test } from './rooms-fixture';

test('scales text and controls with the root font size and keeps narrow screens usable', async ({
  page,
}) => {
  await page.goto('/students');
  const field = page.getByLabel('Nome da sala');
  const button = page.getByRole('button', { name: 'Entrar na sala' });
  const before = await field.boundingBox();
  const beforeFont = await button.evaluate((element) =>
    parseFloat(getComputedStyle(element).fontSize),
  );

  await page.addStyleTag({ content: 'html { font-size: 125%; }' });
  const after = await field.boundingBox();
  const afterFont = await button.evaluate((element) =>
    parseFloat(getComputedStyle(element).fontSize),
  );

  expect(after!.height / before!.height).toBeCloseTo(1.25, 2);
  expect(afterFont / beforeFont).toBeCloseTo(1.25, 2);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(field).toBeVisible();
  await enterRoom(page, { resume: false });
  await expect(page.getByRole('button', { name: 'Retomar exploração', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
