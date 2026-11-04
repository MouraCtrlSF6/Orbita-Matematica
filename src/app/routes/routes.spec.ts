import { expect, test } from '@playwright/test';

test('abre a escolha de perfil e navega pelos cards com teclado e histórico', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/sign$/);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Sou Professor' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/teachers$/);
  await expect(page.getByRole('heading', { name: 'Área do professor' })).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/sign$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/teachers$/);
  await page.getByRole('link', { name: 'Voltar à escolha de perfil' }).click();

  const studentCard = page.getByRole('link', { name: 'Sou aluno' });
  await studentCard.focus();
  await studentCard.press('Enter');
  await expect(page).toHaveURL(/\/students$/);
  await expect(page.locator('main#main')).toBeVisible();
});
