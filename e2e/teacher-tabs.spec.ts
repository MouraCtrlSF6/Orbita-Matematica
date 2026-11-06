import { expect } from '@playwright/test';
import { test } from './rooms-fixture';

test('loads questions on first visit and preserves drafts, expansions and live students across tabs', async ({
  page,
}) => {
  const loads: string[] = [];
  await page.exposeFunction('recordCatalogLoad', (id: string) => loads.push(id));
  await page.goto('/teachers');
  await page.getByLabel('Nome da sala').fill('Turma teste');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await expect(page.getByRole('status')).toHaveText('Registros de alunos: 0');
  expect(loads).toHaveLength(0);

  const questions = page.getByRole('tab', { name: 'Questões', exact: true });
  const students = page.getByRole('tab', { name: 'Alunos', exact: true });
  await questions.click();
  const sector = page.getByRole('button', { name: /Estação de lançamento · 22 questões/ });
  await expect(sector).toBeVisible();
  expect(loads.length).toBeGreaterThan(0);
  const firstVisitLoads = loads.length;
  await sector.click();
  await page.getByRole('button', { name: 'Adicionar questão', exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill('Rascunho preservado');

  await page.evaluate(() => {
    window.dispatchEvent(
      new CustomEvent('mock-room-update', {
        detail: [{ studentId: 'live-student', name: 'Aluno em tempo real', sectors: {} }],
      }),
    );
  });
  await students.click();
  await expect(page.getByRole('status')).toHaveText('Registros de alunos: 1');
  await expect(
    page.getByRole('button', { name: 'Aluno em tempo real', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Título', exact: true })).toHaveCount(0);
  await expect(page.locator('[role="tabpanel"][data-state="inactive"] :focus')).toHaveCount(0);

  await questions.click();
  await expect(page.getByLabel('Título', { exact: true })).toHaveValue('Rascunho preservado');
  await page.getByRole('button', { name: 'Voltar para a listagem de questões' }).click();
  await expect(sector).toHaveAttribute('aria-expanded', 'true');
  expect(loads).toHaveLength(firstVisitLoads);

  await page.getByRole('button', { name: 'Recarregar questões' }).click();
  await expect(sector).toBeVisible();
  await expect.poll(() => loads.length).toBeGreaterThan(firstVisitLoads);
  const reloadCount = loads.length;
  await students.click();
  await questions.click();
  await expect(sector).toBeVisible();
  expect(loads).toHaveLength(reloadCount);

  await page.getByRole('button', { name: 'Adicionar questão', exact: true }).click();
  await page.getByLabel('Título', { exact: true }).fill('Rascunho da sala antiga');
  page.once('dialog', (dialog) => void dialog.accept());
  await page.getByRole('button', { name: 'Excluir sala', exact: true }).click();
  await expect(page.getByRole('status')).toHaveText('Sala excluída.');
  await page.getByRole('link', { name: 'Voltar à escolha de perfil' }).click();
  await page.getByRole('link', { name: 'Sou Professor', exact: true }).click();
  await page.getByLabel('Nome da sala').fill('Outra turma');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await expect(students).toHaveAttribute('aria-selected', 'true');
  expect(loads).toHaveLength(reloadCount);
  await questions.click();
  await expect(sector).toBeVisible();
  await expect.poll(() => loads.length).toBeGreaterThan(reloadCount);
  await page.getByRole('button', { name: 'Adicionar questão', exact: true }).click();
  await expect(page.getByLabel('Título', { exact: true })).toBeEmpty();
});
