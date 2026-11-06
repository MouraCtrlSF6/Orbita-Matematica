import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('keeps profile links accessible across screen sizes and enlarged text', async ({ page }) => {
  await page.goto('/sign');
  await expect(page.getByRole('heading', { name: 'Pronto para a expedição?' })).toBeVisible();

  for (const width of [390, 700, 1000, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const cards = page.locator('.profile-cards a');
    const teacher = await cards.nth(0).boundingBox();
    const student = await cards.nth(1).boundingBox();

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(teacher!.width).toBeGreaterThan(200);
    expect(student!.width).toBeCloseTo(teacher!.width, 0);
    if (width <= 700) {
      expect(student!.y).toBeGreaterThanOrEqual(teacher!.y + teacher!.height);
    } else {
      expect(student!.y).toBe(teacher!.y);
    }
  }

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.screenshot({ path: test.info().outputPath('sign-desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: test.info().outputPath('sign-mobile.png'), fullPage: true });
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole('link', { name: 'Sou aluno', exact: true }).scrollIntoViewIfNeeded();
  await expect(page.getByRole('link', { name: 'Sou aluno', exact: true })).toBeInViewport();
});

test('opens both profiles with the keyboard', async ({ page }) => {
  await page.goto('/sign');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Sou Professor', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/teachers$/);
  await page.goBack();
  await page.getByRole('link', { name: 'Sou aluno', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/students$/);
});
