import { expect, type Page } from '@playwright/test';
import { test } from './rooms-fixture';

async function createRoom(page: Page) {
  await page.goto('/teachers');
  await page.getByLabel('Nome da sala').fill('Turma teste');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await expect(page.getByRole('status')).toHaveText('Registros de alunos: 0');
}

test('toasts room deletion errors and success after the room view unmounts', async ({ page }) => {
  await createRoom(page);
  await page.getByRole('button', { name: 'Excluir sala', exact: true }).click();
  const dialog = page.getByRole('dialog');

  await dialog.getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(page.locator('.toast')).toHaveCount(0);
  await page.evaluate(() => localStorage.setItem('mock-room-delete-error', 'true'));
  await page.getByRole('button', { name: 'Excluir sala', exact: true }).click();
  await dialog.getByRole('button', { name: 'Excluir sala', exact: true }).click();
  await expect(page.locator('.toast')).toContainText(
    'Não foi possível confirmar a exclusão da sala.',
  );
  await expect(dialog).toBeVisible();
  await page.evaluate(() => localStorage.removeItem('mock-room-delete-error'));
  await dialog.getByRole('button', { name: 'Excluir sala', exact: true }).click();
  await expect(page.locator('.toast')).toContainText('Sala excluída com sucesso.');
  await expect(dialog).toHaveCount(0);
  await page.screenshot({ path: test.info().outputPath('room-deleted-toast.png') });
  await page.getByRole('button', { name: 'Fechar notificação' }).click();
  await expect(page.locator('.toast')).toHaveCount(0);
});

test('toasts student deletion errors and success after the student disappears', async ({
  page,
}) => {
  await createRoom(page);
  await page.evaluate(() => {
    window.dispatchEvent(
      new CustomEvent('mock-room-update', {
        detail: [{ studentId: 'toast-student', name: 'Aluno de teste', sectors: {} }],
      }),
    );
    localStorage.setItem('mock-student-delete-error', 'true');
  });
  await page.getByRole('button', { name: 'Aluno de teste', exact: true }).click();
  await page.getByRole('button', { name: 'Remover Aluno de teste da sala' }).click();
  const dialog = page.getByRole('dialog');

  await dialog.getByRole('button', { name: 'Remover aluno', exact: true }).click();
  await expect(page.locator('.toast')).toContainText('Não foi possível remover o aluno.');
  await expect(dialog).toBeVisible();
  await page.evaluate(() => localStorage.removeItem('mock-student-delete-error'));
  await dialog.getByRole('button', { name: 'Remover aluno', exact: true }).click();
  await expect(page.locator('.toast')).toContainText('Aluno removido com sucesso.');
  await expect(page.getByRole('button', { name: 'Remover Aluno de teste da sala' })).toHaveCount(0);
});

test('toasts question creation and deletion errors and successful retries', async ({ page }) => {
  await createRoom(page);
  await page.getByRole('tab', { name: 'Questões', exact: true }).click();
  await page.getByRole('button', { name: 'Adicionar questão', exact: true }).click();
  await page.getByRole('combobox', { name: 'Formato', exact: true }).click();
  await page.getByRole('option', { name: 'Discursiva', exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill('Questão toast');
  await page.getByLabel('Enunciado', { exact: true }).fill('Quanto é 2 + 2?');
  await page.getByLabel('Resposta esperada', { exact: true }).fill('4');
  await page.getByLabel('Explicação da resposta', { exact: true }).fill('Some dois com dois.');
  await page.evaluate(() => localStorage.setItem('mock-catalog-write-error', 'true'));
  await page.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.locator('.toast')).toContainText('A questão não foi salva.');
  await expect(page.getByLabel('Título', { exact: true })).toHaveValue('Questão toast');
  await page.evaluate(() => localStorage.removeItem('mock-catalog-write-error'));
  await page.getByRole('button', { name: 'Adicionar questão à sala' }).click();
  await expect(page.locator('.toast')).toContainText('Questão criada com sucesso.');
  await page.getByRole('button', { name: 'Voltar para a listagem de questões' }).click();
  await page.getByRole('button', { name: /Estação de lançamento · 23 questões/ }).click();
  await page.getByRole('button', { name: 'Questão toast · Discursiva', exact: true }).click();
  await page.getByRole('button', { name: 'Excluir questão', exact: true }).click();
  const dialog = page.getByRole('dialog');

  await page.evaluate(() => localStorage.setItem('mock-catalog-write-error', 'true'));
  await dialog.getByRole('button', { name: 'Excluir questão', exact: true }).click();
  await expect(page.locator('.toast')).toContainText('Não foi possível excluir a questão.');
  await expect(dialog).toBeVisible();
  await page.evaluate(() => localStorage.removeItem('mock-catalog-write-error'));
  await dialog.getByRole('button', { name: 'Excluir questão', exact: true }).click();
  await expect(page.locator('.toast')).toContainText('Questão excluída com sucesso.');
  await expect(dialog).toHaveCount(0);
});
