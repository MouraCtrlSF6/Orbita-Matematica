import { expect, type Page } from '@playwright/test';
import { enterRoom, test } from '../../../e2e/rooms-fixture';

async function createRoom(page: Page) {
  await page.getByLabel('Nome da sala').fill('Turma Têste');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await expect(page.getByText('turma teste', { exact: true })).toBeVisible();
}

test('opens profile selection and navigates the cards with the keyboard and history', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/sign$/);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Sou Professor' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/teachers$/);
  await expect(page.getByRole('heading', { name: 'Área do professor' })).toBeVisible();
  await page.getByLabel('Nome da sala').fill('Sala ocupada');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await expect(page.getByRole('alert')).toContainText('Já existe uma sala');
  await createRoom(page);
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
  page.once('dialog', (dialog) => void dialog.accept());
  await page.getByRole('button', { name: 'Remover Aluno de teste da sala' }).click();
  await expect(page.getByRole('status')).toHaveText('Registros de alunos: 0');

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
  await page.getByLabel('Nome da sala').fill('!!!');
  await page.getByLabel('Nome completo').fill('Aluno de teste');
  await page.getByRole('button', { name: 'Entrar na sala' }).click();
  await expect(page.getByRole('alert')).toContainText('Use de 3 a 48 caracteres');
  await page.getByLabel('Nome da sala').fill('turma inexistente');
  await page.getByLabel('Nome completo').fill('Aluno de teste');
  await page.getByRole('button', { name: 'Entrar na sala' }).click();
  await expect(page.getByRole('alert')).toContainText('Sala não encontrada');
  await expect(page.locator('main#main')).toHaveCount(0);
  await enterRoom(page);
  await expect(page.locator('main#main')).toBeVisible();
});

test('allows creating another room after deletion and returning to the teacher area', async ({
  page,
}) => {
  await page.goto('/teachers');
  await createRoom(page);
  page.once('dialog', (dialog) => void dialog.accept());
  await page.getByRole('button', { name: 'Excluir sala' }).click();
  await expect(page.getByRole('status')).toHaveText('Sala excluída.');
  await page.getByRole('link', { name: 'Voltar à escolha de perfil' }).click();
  await page.getByRole('link', { name: 'Sou Professor' }).click();
  await expect(page.getByLabel('Nome da sala')).toBeVisible();
  await expect(page.getByText('Sala excluída.', { exact: true })).toHaveCount(0);
  await page.getByLabel('Nome da sala').fill('Nova turma');
  await page.getByRole('button', { name: 'Criar sala' }).click();
  await expect(page.getByText('nova turma', { exact: true })).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('Registros de alunos: 0');
});
