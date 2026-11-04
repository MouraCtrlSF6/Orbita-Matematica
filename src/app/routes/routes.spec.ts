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
    window.dispatchEvent(
      new CustomEvent('mock-room-update', {
        detail: [
          {
            studentId: 'test-student',
            name: 'Aluno de teste',
            sectors: {
              launch: {
                sectorName: 'Estação',
                sectorStatus: 'in_progress',
                missions: {
                  launch1: {
                    missionNumber: 1,
                    missionStatus: 'in_progress',
                    usedHints: true,
                    usedVisuals: false,
                    providedAnswers: {
                      'attempt-1': {
                        order: 1,
                        answer: { label: 'Resposta numérica', value: '4' },
                        correct: false,
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      }),
    ),
  );
  await expect(page.getByRole('status')).toHaveText('Registros de alunos: 1');
  await page.getByText('Aluno de teste', { exact: true }).click();
  await page.getByText('Estação · Em andamento').click();
  await page.getByText('Missão 1 · Em andamento').click();
  await expect(page.getByText('Resposta numérica · 4 · Incorreta')).toBeVisible();

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
  await page.getByLabel('Nome completo').fill('Aluno de teste');
  await page.getByRole('button', { name: 'Entrar na sala' }).click();
  await expect(page.getByRole('alert')).toContainText('UID completo');
  await page.getByLabel('UID da sala').fill('11111111-1111-4111-8111-111111111111');
  await page.getByLabel('Nome completo').fill('Aluno de teste');
  await page.getByRole('button', { name: 'Entrar na sala' }).click();
  await expect(page.getByRole('alert')).toContainText('Sala não encontrada');
  await expect(page.locator('main#main')).toHaveCount(0);
  await enterRoom(page);
  await expect(page.locator('main#main')).toBeVisible();
});

test('confirma a exclusão e não recria a sala ao voltar à rota', async ({ page }) => {
  await page.goto('/teachers');
  page.once('dialog', (dialog) => void dialog.accept());
  await page.getByRole('button', { name: 'Excluir sala' }).click();
  await expect(page.getByRole('status')).toHaveText('Sala excluída.');
  await page.getByRole('link', { name: 'Voltar à escolha de perfil' }).click();
  await page.getByRole('link', { name: 'Sou Professor' }).click();
  await expect(page.getByRole('status')).toHaveText('Sala excluída.');
});
