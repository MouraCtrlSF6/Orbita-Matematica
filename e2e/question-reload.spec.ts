import { expect } from '@playwright/test';
import { test } from './rooms-fixture';

test('spins the reload icon only while questions are loading', async ({ page }) => {
  let releaseLoad: () => void = () => {};
  let blocked = false;
  const loadGate = new Promise<void>((resolve) => {
    releaseLoad = resolve;
  });

  await page.exposeFunction('recordCatalogLoad', async () => {
    if (blocked) await loadGate;
  });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/teachers');
  await page.getByLabel('Nome da sala').fill('Turma teste');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await page.getByRole('tab', { name: 'Questões', exact: true }).click();
  const reload = page.getByRole('button', { name: 'Recarregar questões', exact: true });
  const icon = reload.locator('svg');

  await expect(reload).toBeEnabled();
  await expect(icon).toHaveCSS('animation-name', 'none');
  blocked = true;
  await reload.click();
  await expect(reload).toBeDisabled();
  await expect(reload).toHaveAttribute('aria-busy', 'true');
  await expect(icon).toHaveCSS('animation-name', 'spin');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(icon).toHaveCSS('animation-name', 'none');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(icon).toHaveCSS('animation-name', 'spin');
  releaseLoad();
  await expect(reload).toBeEnabled();
  await expect(reload).toHaveAttribute('aria-busy', 'false');
  await expect(icon).toHaveCSS('animation-name', 'none');

  await page.evaluate(() => localStorage.setItem('mock-catalog-read-error', 'true'));
  await reload.click();
  await expect(page.getByRole('alert')).toContainText('Não foi possível carregar as questões');
  await expect(reload).toBeEnabled();
  await expect(icon).toHaveCSS('animation-name', 'none');
});
