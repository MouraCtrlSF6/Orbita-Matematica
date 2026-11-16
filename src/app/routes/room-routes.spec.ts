import { expect } from '@playwright/test';
import { missions } from '../../content/missions';
import { test } from '../../../e2e/rooms-fixture';

const studentRoom = '/students/rooms/turma%20teste';
const teacherPanel = '/teachers/rooms/turma%20teste/panel';

test('resumes a requested mission after room entry and validates history visits', async ({
  page,
}) => {
  const missionPath = `${studentRoom}/sectors/launch/missions/${missions[0].id}`;

  await page.goto(missionPath);
  await expect(page).toHaveURL(/\/students\/rooms\/enter$/);
  await expect(page.getByLabel('Nome da sala')).toHaveValue('turma teste');
  await page.getByLabel('Nome completo').fill('Aluno de teste');
  await page.getByRole('button', { name: 'Entrar na sala' }).click();
  await expect(page).toHaveURL(new RegExp(missionPath + '$'));

  await page.getByRole('button', { name: 'Voltar ao setor' }).click();
  await expect(page).toHaveURL(new RegExp(studentRoom + '/sectors/launch$'));
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(missionPath + '$'));
  await page.goForward();
  await expect(page).toHaveURL(new RegExp(studentRoom + '/sectors/launch$'));
});

test('canonicalizes question tabs and restores them through history', async ({ page }) => {
  await page.goto(teacherPanel + '?tab=questions&list=true&create=true');
  await expect(page).toHaveURL(/panel\?tab=questions&list=true$/);
  await page.getByRole('button', { name: 'Adicionar questão', exact: true }).click();
  await expect(page).toHaveURL(/panel\?tab=questions&create=true$/);
  await page.getByRole('tab', { name: 'Alunos', exact: true }).click();
  await expect(page).toHaveURL(/panel\?tab=students$/);
  await page.goBack();
  await expect(page.getByLabel('Título', { exact: true })).toBeVisible();
});
