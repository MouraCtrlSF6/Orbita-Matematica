import { expect } from '@playwright/test';
import { enterRoom, test } from '../../../e2e/rooms-fixture';

test('abre a escolha de perfil e navega pelos cards com teclado e histórico', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/sign$/);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Sou Professor' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/teachers$/);
  await expect(page.getByRole('heading', { name: 'Área do professor' })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('Registros de alunos: 0');
  await page.evaluate(() =>
    window.dispatchEvent(new CustomEvent('mock-room-update', { detail: 2 })),
  );
  await expect(page.getByRole('status')).toHaveText('Registros de alunos: 2');

  await page.goBack();
  await expect(page).toHaveURL(/\/sign$/);
  await page.goForward();
  await expect(page).toHaveURL(/\/teachers$/);
  await page.getByRole('link', { name: 'Voltar à escolha de perfil' }).click();

  const studentCard = page.getByRole('link', { name: 'Sou aluno' });
  await studentCard.focus();
  await studentCard.press('Enter');
  await expect(page).toHaveURL(/\/students$/);
  await expect(page.locator('main#main')).toHaveCount(0);
  await page.getByLabel('UID da sala').fill('inválido');
  await page.getByRole('button', { name: 'Entrar na sala' }).click();
  await expect(page.getByRole('alert')).toContainText('UID completo');
  await page.getByLabel('UID da sala').fill('11111111-1111-4111-8111-111111111111');
  await page.getByRole('button', { name: 'Entrar na sala' }).click();
  await expect(page.getByRole('alert')).toContainText('Sala não encontrada');
  await expect(page.locator('main#main')).toHaveCount(0);
  await enterRoom(page);
  await expect(page.locator('main#main')).toBeVisible();
});
